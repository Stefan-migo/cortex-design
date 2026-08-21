// plain-js adapter (ITG-001/ITG-002): exactly {detect, resolve, emit}.
// detect caches verdict, resolve caches assets, emit reads cache.
// Stack-agnostic fallback: HTML Storybook + raw CSS tokens. Node stdlib only (AD-2).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

// Canonical namespace (VA-001): 11 tokens — palette 4, typography 3, rhythm 2,
// animation-tone 2; scroll-narrative reserved (VA-005). Cap 12 (VA-004).
const TOKENS = {
  '--palette-primary': '#6b56f0',
  '--palette-secondary': '#0f0f23',
  '--palette-background': '#0b0b16',
  '--palette-text': '#f5f0ff',
  '--typography-heading': 'Space Grotesk',
  '--typography-body': 'Inter',
  '--typography-mono': 'monospace',
  '--rhythm-base': '0.5rem',
  '--rhythm-radius': '1rem',
  '--animation-duration': '0.3s',
  '--animation-easing': 'cubic-bezier(0.4, 0, 0.2, 1)',
};
// Legacy --od-* aliases -> canonical; never deleted (CP-005/VA-001).
const LEGACY = {
  '--od-color-primary': '--palette-primary',
  '--od-color-secondary': '--palette-secondary',
  '--od-text': '--palette-text',
  '--od-bg': '--palette-background',
};

let verdict = null; // detect() cache
let assets = null;  // resolve() cache

// VA-004: cap generated tokens at 12. Palette is mandatory, never dropped
// (VA-006); extras (derived tokens) drop before canonical, and always a reason.
// Priority: palette > canonical > extra.
function cap(base, dropped, extra) {
  const pool = base.concat(extra);
  const priority = (k) => (k.startsWith('--palette-') ? 3 : k in TOKENS ? 2 : 1);
  while (pool.length > 12) {
    let idx = 0;
    for (let i = 1; i < pool.length; i++) if (priority(pool[i][0]) < priority(pool[idx][0])) idx = i;
    const [k] = pool.splice(idx, 1)[0];
    dropped.push({ token: k, reason: `over 12-token cap (VA-004): dropped lowest-priority ${k}` });
  }
  return pool;
}

export default {
  detect(project) {
    if (verdict === null) verdict = !!(project && project.packageJson);
    return verdict;
  },
  resolve(contracts) {
    if (assets) return assets;
    const dropped = [];
    const entries = cap(Object.entries(TOKENS), dropped, []);
    // Derived token overrun (VA-004) comes from redesign-intent.derivedTokens.
    const intent = (contracts || []).find((c) => Array.isArray(c.derivedTokens)) || {};
    const extras = (intent.derivedTokens || []).map((t) => (Array.isArray(t) ? [...t] : [t, '']));
    const capped = cap(entries, dropped, extras);
    const css = capped.map(([k, v]) => `  ${k}: ${v};`);
    for (const [legacy, canon] of Object.entries(LEGACY)) {
      if (capped.some(([k]) => k === canon)) css.push(`  ${legacy}: var(${canon}); /* alias -> ${canon} */`);
    }
    assets = {
      css: `:root {\n${css.join('\n')}\n}\n`,
      dropped,
      aliased: Object.keys(LEGACY),
      storybook: {
        'main.js': "// Local Storybook for plain JS target (CP-002/CP-003); HTML builder, self-contained.\nmodule.exports = { stories: ['../**/*.stories.js'], addons: [], framework: { name: '@storybook/html-vite' } };\n",
        'preview.js': "// Local Storybook (CP-002/CP-003); no host-repo references (SB-GLOBAL-003).\nexport default { parameters: { docs: { toc: true } } };\n",
      },
      catalog: `${JSON.stringify({ version: '1.0.0', components: contracts.map((c) => ({ id: c.id, adaptationRules: { variants: {}, tokenSlots: [], defaultProps: {}, defaults: {} } })) }, null, 2)}\n`,
    };
    return assets;
  },
  emit(target, a) {
    const out = a || assets;
    for (const [file, body] of Object.entries(out.storybook)) {
      const p = join(target, '.storybook', file);
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, body);
    }
    writeFileSync(join(target, '.storybook', 'component-catalog.json'), out.catalog);
    writeFileSync(join(target, 'tokens.css'), out.css);
  },
};
