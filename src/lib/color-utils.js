/**
 * Shared color-math helpers (HLP-001).
 *
 * Only helpers whose semantics are byte-identical across consumers live here.
 * Every variant with consumer-specific behavior stays as a LOCAL copy in its
 * component (HLP-002) so consolidation never changes rendering output:
 *   - `LightRays.hexToRgb`  → array 0-1 WITH `[1,1,1]` bad-input fallback
 *   - `DotGrid.hexToRgb`    → object {r,g,b} 0-255 with `{0,0,0}` fallback
 *   - `FloatingLines.hexToVec3` → OGL Vector3, supports 3- AND 6-digit hex
 *   - `CurvedInput.hexToRgba`   → rgba() string, alpha arg, NaN passthrough
 *   - `DomeGallery.clamp` / `ProfileCard.clamp` → differ in default bounds
 *
 * Importing a normalized-rgb helper from here is safe ONLY for consumers that
 * pass a 6-digit `#rrggbb` and expect a plain `[r,g,b]` array in 0..1.
 */

/** 6-digit `#rrggbb` (or `rrggbb`) → `[r,g,b]` each in 0..1. No defaults. */
export function hexToNormalizedRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}
