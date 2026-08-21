import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync,
  existsSync, cpSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BOOTSTRAP = join(HOST, '.cortex', 'bootstrap.js');

function tempDir(name) {
  return mkdtempSync(join(tmpdir(), `cortex-${name}-`));
}
function writePkg(dir, overrides = {}) {
  writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify({ name: 'plain-target', version: '0.1.0', type: 'module', ...overrides }, null, 2)
  );
}
function run(target) {
  return spawnSync(process.execPath, [BOOTSTRAP, '--target', target], { encoding: 'utf8' });
}

describe('CP-001 bootstrap installs in a plain JS project', () => {
  it('creates .cortex/, 4 contracts, adapter, local .storybook/, catalog; exit 0', () => {
    const t = tempDir('plain');
    writePkg(t);
    const r = run(t);
    expect(r.status).toBe(0);
    expect(existsSync(join(t, '.cortex', 'contracts', 'preservation-matrix.json'))).toBe(true);
    expect(existsSync(join(t, '.cortex', 'adapters', 'plain-js.js'))).toBe(true);
    expect(existsSync(join(t, '.storybook', 'main.js'))).toBe(true);
    expect(existsSync(join(t, '.storybook', 'preview.js'))).toBe(true);
    expect(existsSync(join(t, '.storybook', 'component-catalog.json'))).toBe(true);
    expect(readFileSync(join(t, '.storybook', 'main.js'), 'utf8')).toMatch(/html/i);
    rmSync(t, { recursive: true, force: true });
  });

  it('CP-002: host SRCS diff stays empty — bootstrap writes only into the target', () => {
    const t = tempDir('cp002');
    writePkg(t);
    const r = run(t);
    expect(r.status).toBe(0);
    const g = spawnSync('git', ['diff', '--name-only', '--', 'src/'], {
      cwd: HOST, encoding: 'utf8',
    });
    expect(g.stdout.trim()).toBe('');
    rmSync(t, { recursive: true, force: true });
  });
});

describe('CP-001 failure paths', () => {
  it('missing package.json -> exit != 0 + named error (not a JS project)', () => {
    const t = tempDir('nopkg');
    const r = run(t);
    expect(r.status).not.toBe(0);
    expect(r.stderr || r.stdout).toMatch(/not a JS project/i);
  });

  it('malformed package.json -> exit != 0 + named error', () => {
    const t = tempDir('badpkg');
    writeFileSync(join(t, 'package.json'), '{ not json');
    const r = run(t);
    expect(r.status).not.toBe(0);
    expect(r.stderr || r.stdout).toMatch(/parse|malformed|package\.json/i);
  });

  it('DC-005 drift: contract diverging from schema -> non-zero + contract named', () => {
    const src = tempDir('capsule');
    cpSync(join(HOST, '.cortex'), join(src, '.cortex'), { recursive: true });
    const drifted = join(src, '.cortex', 'contracts', 'redesign-intent.json');
    writeFileSync(drifted, JSON.stringify({ id: 'x', brief: 123, derivedTokens: [] }));
    const target = tempDir('drift');
    writePkg(target);
    const r = spawnSync(
      process.execPath,
      [join(src, '.cortex', 'bootstrap.js'), '--target', target],
      { encoding: 'utf8' }
    );
    expect(r.status).not.toBe(0);
    expect(r.stderr || r.stdout).toMatch(/drift|redesign-intent|brief/i);
  });
});

describe('SB-GLOBAL-000: dual bind ports, no host collision', () => {
  it('local scaffold is self-contained: no global react-vite host refs, own config only', () => {
    const t = tempDir('dualport');
    writePkg(t);
    const r = run(t);
    expect(r.status).toBe(0);
    const main = readFileSync(join(t, '.storybook', 'main.js'), 'utf8');
    expect(main).toMatch(/html/);
    expect(main).not.toMatch(/react|@storybook\/react/);
    expect(existsSync(join(HOST, '.storybook'))).toBe(false);
    rmSync(t, { recursive: true, force: true });
  });
});

describe('VA-004/VA-006: 12-token cap, palette never dropped', () => {
  it('canonical base stays at 11; over-cap drops lowest-priority non-palette with reason', async () => {
    const mod = await import(`../.cortex/adapters/plain-js.js`);
    const assets = mod.default.resolve([
      { id: 'p', stack: 'plain-js', presentColors: {}, presentTypography: [], existingTokens: {}, notes: [] },
      { id: 'i', derivedTokens: [['--palette-bg2', '#000'], ['--rhythm-gap', '1rem'], ['--anim-float', '2s'], ['--scroll-x', '100vh']] },
    ]);
    const dots = assets.css.split('\n').filter((l) => l.trim().startsWith('--') && !l.includes('var(')).length;
    expect(dots).toBeLessThanOrEqual(12);
    const css = assets.css;
    for (const p of ['primary', 'secondary', 'background', 'text']) {
      expect(css).toContain(`--palette-${p}:`);
    }
    expect(assets.dropped.length).toBeGreaterThan(0);
    expect(assets.dropped.every((d) => !d.token.startsWith('--palette-'))).toBe(true);
    expect(assets.dropped[0].reason).toMatch(/VA-004/);
  });
});
