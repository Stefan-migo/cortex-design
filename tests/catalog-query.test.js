import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { queryComponents } from '../.cortex/catalog-query.js';

const catalog = JSON.parse(
  readFileSync(resolve(import.meta.dirname, '../.storybook/component-catalog.json'), 'utf8')
);

describe('CA-001 catalog query by context (DC-004)', () => {
  it('returns all matching components for visualContext + OR-moodTags', () => {
    const heroDynamic = queryComponents(catalog, {
      visualContext: 'hero',
      moodTags: ['dynamic', 'playful'],
    });
    // OR semantics: any component with visualContext hero AND any mood tag in
    // {dynamic,playful} matches. All matches must satisfy BOTH filters.
    expect(Array.isArray(heroDynamic)).toBe(true);
    expect(heroDynamic.length).toBeGreaterThan(0);
    for (const c of heroDynamic) {
      expect(c.visualContext).toContain('hero');
      expect(c.moodTags.some((t) => ['dynamic', 'playful'].includes(t))).toBe(true);
    }
  });

  it('no visualContext match returns an empty array without throwing', () => {
    let result;
    expect(() => {
      result = queryComponents(catalog, { visualContext: 'no-such-context' });
    }).not.toThrow();
    expect(result).toEqual([]);
  });

  it('empty query returns every component (no filters applied)', () => {
    const all = queryComponents(catalog, {});
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(catalog.components.length);
  });
});
