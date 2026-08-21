import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import {
  cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HOST = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BOOTSTRAP = join(HOST, '.cortex', 'bootstrap.js');
const FIXTURE = join(HOST, 'tests', 'fixtures', 'plain-js-port');

// Load the bootstrap's own validator (CJS source via node:vm, same as bootstrap).
const require = createRequire(import.meta.url);
function loadValidator() {
  const code = readFileSync(join(HOST, '.cortex', 'validate.js'), 'utf8');
  const mod = { exports: {} };
  vm.runInNewContext(code, {
    module: mod, exports: mod.exports,
    require: (id) => require(id),
  });
  return mod.exports;
}
const { validate } = loadValidator();

function tempDir(name) {
  return mkdtempSync(join(tmpdir(), `cortex-port-${name}-`));
}
function runBootstrap(target) {
  return spawnSync(process.execPath, [BOOTSTRAP, '--target', target], { encoding: 'utf8' });
}
// Recursive listing of encoded text files under a dir.
function fileList(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) fileList(p, out);
    else if (/\.(json|js|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

describe('CP-004: end-to-end external plain-JS port proof', () => {
  it('evidence (a) four contracts land under target/.cortex/contracts/ and validate', () => {
    const t = tempDir('contracts');
    cpSync(FIXTURE, t, { recursive: true });
    const r = runBootstrap(t);
    expect(r.status).toBe(0);
    const landed = readdirSync(join(t, '.cortex', 'contracts')).filter((f) => f.endsWith('.json'));
    expect(landed).toHaveLength(4);
    for (const f of landed) {
      expect(() => validate(JSON.parse(readFileSync(join(t, '.cortex', 'contracts', f), 'utf8')))).not.toThrow();
    }
    rmSync(t, { recursive: true, force: true });
  });

  it('evidence (b) local Storybook scaffold exists under target/.storybook/', () => {
    const t = tempDir('storybook');
    cpSync(FIXTURE, t, { recursive: true });
    const r = runBootstrap(t);
    expect(r.status).toBe(0);
    expect(existsSync(join(t, '.storybook', 'main.js'))).toBe(true);
    expect(existsSync(join(t, '.storybook', 'preview.js'))).toBe(true);
    expect(existsSync(join(t, '.storybook', 'component-catalog.json'))).toBe(true);
    expect(readFileSync(join(t, '.storybook', 'main.js'), 'utf8')).toMatch(/html/i);
    rmSync(t, { recursive: true, force: true });
  });

  it('evidence (c) emitted catalog validates against DC-004 and contains the 4 contracts', () => {
    const t = tempDir('catalog');
    cpSync(FIXTURE, t, { recursive: true });
    const r = runBootstrap(t);
    expect(r.status).toBe(0);
    const catalog = JSON.parse(readFileSync(join(t, '.storybook', 'component-catalog.json'), 'utf8'));
    expect(() => validate(catalog)).not.toThrow();
    const ids = catalog.components.map((c) => c.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'cortex-design-profile', 'cortex-preservation-matrix',
        'cortex-redesign-intent', 'cortex-visual-contract-v1',
      ])
    );
    rmSync(t, { recursive: true, force: true });
  });
});

describe('CP-004: port fails when a contract is malformed, naming it', () => {
  it('malformed preservation-matrix.json -> exit != 0 and error names the contract', () => {
    const t = tempDir('malformed');
    cpSync(FIXTURE, t, { recursive: true });
    // Scratch capsule copy whose preservation-matrix.json is malformed JSON.
    const scratchCapsule = tempDir('capsule');
    cpSync(join(HOST, '.cortex'), join(scratchCapsule, '.cortex'), { recursive: true });
    writeFileSync(join(scratchCapsule, '.cortex', 'contracts', 'preservation-matrix.json'), '{ not valid json');
    const r = spawnSync(
      process.execPath,
      [join(scratchCapsule, '.cortex', 'bootstrap.js'), '--target', t],
      { encoding: 'utf8' }
    );
    expect(r.status).not.toBe(0);
    expect(r.stderr || r.stdout).toMatch(/preservation-matrix\.json/);
    expect(r.stderr || r.stdout).toMatch(/malformed|not valid JSON/i);
    rmSync(t, { recursive: true, force: true });
    rmSync(scratchCapsule, { recursive: true, force: true });
  });
});

describe('SB-GLOBAL-003: ported output references zero host-repo paths', () => {
  it('scaffolded .storybook/ and .cortex/ in the target contain no host path', () => {
    const t = tempDir('nohost');
    cpSync(FIXTURE, t, { recursive: true });
    const r = runBootstrap(t);
    expect(r.status).toBe(0);
    for (const f of fileList(join(t, '.storybook')).concat(fileList(join(t, '.cortex')))) {
      expect(readFileSync(f, 'utf8')).not.toContain(HOST);
    }
    expect(readFileSync(join(t, 'package.json'), 'utf8')).not.toContain(HOST);
    rmSync(t, { recursive: true, force: true });
  });
});
