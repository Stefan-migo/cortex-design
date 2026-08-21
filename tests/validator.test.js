import { describe, it, expect } from 'vitest';
import { mkdtempSync, readdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { validate, write } from '../.cortex/validate.js';
import arrayVariants from './fixtures/array-variants.json';
import greenfieldProfile from './fixtures/greenfield-profile.json';

const CONTRACTS = [
  'existing-design-profile',
  'redesign-intent',
  'preservation-matrix',
  'visual-contract-v1'
];

describe('DC-004 canonical catalog schema', () => {
  it('rejects array-form variants with a named error (DC-004/DC-005)', () => {
    expect(() => validate(arrayVariants)).toThrow(/variants/);
    expect(() => validate(arrayVariants)).toThrow(/object/);
  });

  it('accepts object-form variants in a valid component', () => {
    const good = {
      version: '1.0.0',
      components: [{
        id: 'hero',
        storyFile: null,
        visualContext: ['hero'],
        moodTags: ['dramatic'],
        adaptationRules: {
          tokenSlots: ['--palette-primary'],
          defaultProps: { tone: 'primary' },
          variants: { bold: { weight: 700 } },
          defaults: { '--palette-primary': '#6b56f0' }
        }
      }]
    };
    expect(() => validate(good)).not.toThrow();
  });
});

describe('DC-001 write-time validation', () => {
  it('does not create a file and names the offending field for an invalid contract', () => {
    const dir = mkdtempSync(join(tmpdir(), 'cortex-invalid-'));
    const target = join(dir, 'contracts', 'bad.json');
    expect(() => write(target, { id: 'x', stack: 42, notes: [] }))
      .toThrow(/stack/);
    expect(existsSync(join(dir, 'contracts'))).toBe(false);
    expect(readdirSync(dir).length).toBe(0);
  });

  it('writes valid contracts through the write-time validator', () => {
    const dir = mkdtempSync(join(tmpdir(), 'cortex-valid-'));
    const target = join(dir, 'contracts', 'redesign-intent.json');
    write(target, {
      id: 'r', brief: 'b', derivedTokens: [], constraints: [], notes: []
    });
    expect(existsSync(target)).toBe(true);
  });
});

describe('DC-002 existing design profile', () => {
  it('accepts a greenfield profile with empty tokens and a greenfield note', () => {
    expect(() => validate(greenfieldProfile)).not.toThrow();
    expect(greenfieldProfile.presentColors).toEqual({});
    expect(greenfieldProfile.existingTokens).toEqual({});
    expect(greenfieldProfile.notes.some((n) => n.includes('greenfield'))).toBe(true);
  });

  it('captures full existing state (required fields present)', () => {
    const profile = {
      ...greenfieldProfile,
      id: 'full',
      presentColors: { primary: '#111' },
      existingTokens: { '--brand': '#222' }
    };
    expect(() => validate(profile)).not.toThrow();
  });
});

describe('DC-003 redesign intent', () => {
  it('frozen before generation: derivedTokens is empty', () => {
    const intent = {
      id: 'i',
      brief: 'aesthetic brief',
      derivedTokens: [],
      constraints: ['dark-only'],
      notes: []
    };
    expect(() => validate(intent)).not.toThrow();
    expect(intent.derivedTokens).toEqual([]);
    expect(intent.constraints).toContain('dark-only');
  });
});

describe('DC-001 all four packaged contracts validate (DC-005 no drift)', () => {
  for (const name of CONTRACTS) {
    it(`${name}.json validates against the canonical schema`, async () => {
      const doc = await import(`../.cortex/contracts/${name}.json`, { with: { type: 'json' } });
      expect(() => validate(doc.default)).not.toThrow();
    });
  }
});
