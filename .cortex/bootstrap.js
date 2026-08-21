#!/usr/bin/env node
// Cortex capsule bootstrap (CP-001, AD-2). Node stdlib only, zero deps.
// Lifecycle: detect -> resolve -> emit (AD adapter). Any failure exits 1 with a
// named error. Reads target package.json, writes ONLY into the target (CP-002).
import { readFileSync, mkdirSync, writeFileSync, readdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTRACTS_DIR = join(HERE, 'contracts');
const ADAPTERS_DIR = join(HERE, 'adapters');
const require = createRequire(import.meta.url);

// AD-7: ONE validator at write AND bootstrap. validate.js is CommonJS source but
// lives in a `type: module` package, so it cannot be imported natively; run its
// source as a CJS module via node:vm (Node stdlib) so bootstrap reuses it verbatim.
function loadValidator() {
  const code = readFileSync(join(HERE, 'validate.js'), 'utf8');
  const mod = { exports: {} };
  vm.runInNewContext(code, {
    module: mod, exports: mod.exports,
    require: (id) => require(id), // node:fs / node:path builtins resolve fine
  });
  return mod.exports;
}
const { validate } = loadValidator();

function namedError(name, target, msg) {
  return new Error(`${name}: ${msg} (target: ${target})`);
}

async function main(argv) {
  // target resolution: accept `--target <dir>` (or a bare path), else cwd.
  const i = argv.indexOf('--target');
  const raw = i >= 0 ? argv[i + 1] : argv.find((a) => !a.startsWith('--'));
  const tgt = resolve(raw || process.cwd());

  // CP-001: read package.json — missing or malformed -> named error, exit != 0.
  const pkgPath = join(tgt, 'package.json');
  if (!existsSync(pkgPath)) {
    throw namedError('PackageJsonNotFound', tgt, 'target is not a JS project (no package.json)');
  }
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  } catch (e) {
    throw namedError('PackageJsonParseError', pkgPath, `malformed package.json: ${e.message}`);
  }
  if (!pkg || typeof pkg !== 'object' || Array.isArray(pkg)) {
    throw namedError('PackageJsonParseError', pkgPath, 'package.json must be an object');
  }

  // DC-005 / AD-7: validate the four packaged contracts (no drift) BEFORE porting.
  const contracts = [];
  for (const name of readdirSync(CONTRACTS_DIR)) {
    const p = join(CONTRACTS_DIR, name);
    if (!name.endsWith('.json')) continue;
    const doc = JSON.parse(readFileSync(p, 'utf8'));
    try {
      validate(doc);
    } catch (e) {
      throw namedError('ContractDrift', name, `contract drifted from schema (DC-005): ${e.message}`);
    }
    contracts.push({ name, doc });
  }

  // ITG-001: discover adapters, detect -> resolve -> emit. plain-js fallback.
  const adapters = readdirSync(ADAPTERS_DIR).filter((f) => f.endsWith('.js'));
  let chosen = null;
  let considered = [];
  for (const f of adapters) {
    const mod = (await import(pathToFileURL(join(ADAPTERS_DIR, f)).href)).default;
    const applies = mod.detect({ packageJson: pkg, root: tgt });
    considered.push(f.replace(/\.js$/, ''));
    if (applies) { chosen = mod; break; } // first match wins
  }
  if (!chosen) {
    // ITG-002 fallback: no adapter matched; plain-js is the stack-agnostic path.
    const fallback = (await import(pathToFileURL(join(ADAPTERS_DIR, 'plain-js.js')).href)).default;
    console.warn(`WARNING: no adapter applied for target (considered: ${considered.join(', ')}); falling back to plain-js (ITG-001/ITG-002)`);
    chosen = fallback;
  } else if (considered.length > 1) {
    console.warn(`adapters considered: ${considered.join(', ')} (ITG-001)`);
  }

  const project = { packageJson: pkg, root: tgt };
  const assets = chosen.resolve(contracts.map((c) => c.doc));

  // CP-001: copy the four validated contracts into the target capsule first so
  // emit() and contract updates can reference the target .cortex/.
  for (const c of contracts) {
    const dst = join(tgt, '.cortex', 'contracts', c.name);
    mkdirSync(dirname(dst), { recursive: true });
    copyFileSync(join(CONTRACTS_DIR, c.name), dst);
  }
  // CP-001: copy the adapter next to the target contracts.
  const srcAdapter = join(HERE, 'adapters', 'plain-js.js');
  const dstAdapter = join(tgt, '.cortex', 'adapters', 'plain-js.js');
  mkdirSync(dirname(dstAdapter), { recursive: true });
  copyFileSync(srcAdapter, dstAdapter);

  chosen.emit(tgt, assets);

  // DC-001/CP-005: persist VA-004 dropped tokens (with reason) in the target matrix.
  if (assets.dropped.length) {
    const matrixPath = join(tgt, '.cortex', 'contracts', 'preservation-matrix.json');
    const matrix = JSON.parse(readFileSync(matrixPath, 'utf8'));
    matrix.dropped = [...(matrix.dropped || []), ...assets.dropped];
    writeFileSync(matrixPath, `${JSON.stringify(matrix, null, 2)}\n`);
  }

  console.log(`cortex capsule installed into ${tgt} (CP-001) — ${contracts.length} contracts, adapter plain-js, local Storybook scaffolded (CP-002)`);
  if (assets.dropped.length) {
    console.warn(`tokens dropped (VA-004): ${assets.dropped.map((d) => `${d.token} ${d.reason}`).join('; ')}`);
  }
  return 0;
}

try {
  process.exitCode = await main(process.argv.slice(2));
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
}
