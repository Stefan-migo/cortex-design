import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { queryComponents } from '../.cortex/catalog-query.js';

const catalog = JSON.parse(
  readFileSync(resolve(import.meta.dirname, '../.storybook/component-catalog.json'), 'utf8')
);

const corporateIds = [
  'button', 'badge', 'card', 'skeleton', 'input', 'textarea', 'label',
  'native-select', 'checkbox', 'table', 'pagination', 'kbd', 'separator',
  'avatar', 'breadcrumb', 'tabs', 'tooltip', 'progress',
];

describe('CAT-001 catalog version + entry count (DC-004)', () => {
  it('exposes version 1.1.0 with 69 entries (51 existing + 18 corporate)', () => {
    expect(catalog.version).toBe('1.1.0');
    expect(catalog.components).toHaveLength(69);
  });

  it('contains exactly the 18 corporate entries tagged moodTags ["corporate"]', () => {
    const ids = catalog.components.map((c) => c.id);
    const corporate = catalog.components.filter((c) => c.moodTags?.includes('corporate'));
    expect(corporate).toHaveLength(18);
    for (const id of corporateIds) expect(ids).toContain(id);
  });

  it('has no duplicate component ids', () => {
    const ids = catalog.components.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('DC-006/DC-007 no phantom entries', () => {
  it('drops retired phantom ids layout/controls-panel', () => {
    const ids = catalog.components.map((c) => c.id);
    expect(ids).not.toContain('layout');
    expect(ids).not.toContain('controls-panel');
  });

  it('every entry storyFile resolves to an existing file', () => {
    for (const c of catalog.components) {
      if (!c.storyFile) continue;
      const abspath = resolve(import.meta.dirname, '../.storybook', c.storyFile);
      expect(existsSync(abspath), `${c.id}: storyFile ${c.storyFile} must resolve`).toBe(true);
    }
  });
});

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

describe('CA-005 corporate vocabulary query', () => {
  it('visualContext "table" + moodTags ["corporate","clean"] matches the corporate table entry', () => {
    const result = queryComponents(catalog, {
      visualContext: 'table',
      moodTags: ['corporate', 'clean'],
    });
    expect(result.length).toBeGreaterThan(0);
    // OR-within-set + exact visualContext: the corporate table entry must match.
    const ids = result.map((c) => c.id);
    expect(ids).toContain('table');
    for (const c of result) {
      expect(c.visualContext).toContain('table');
      expect(c.moodTags.some((t) => ['corporate', 'clean'].includes(t))).toBe(true);
    }
  });

  it('queries the corporate moodTag across the vocabulary', () => {
    const corporate = queryComponents(catalog, { moodTags: ['corporate'] });
    expect(corporate).toHaveLength(corporateIds.length);
    expect(corporate.map((c) => c.id).sort()).toEqual(
      [...corporateIds].sort()
    );
  });
});
