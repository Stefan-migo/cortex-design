import { useEffect, useRef } from 'react';
import './Cursor.css';

/**
 * CustomCursor — ring + dot with smooth CSS follow.
 *
 * Design rationale:
 *   mix-blend-mode: difference → always visible regardless of bg
 *   CSS transition (not RAF) for position → GPU-composited, zero JS per frame
 *   Ring/dot different transition durations → tension between following elements
 *   Hidden on coarse pointer (touch) — no cursor on tablets/phones
 *   --cursor-x/y custom props → avoids inline style repaints, single DOM write
 */
export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // No custom cursor on touch devices
    const hasFine = window.matchMedia('(pointer: fine)').matches;
    if (!hasFine) {
      cursor.style.display = 'none';
      return;
    }

    const onMove = (e) => {
      const root = document.documentElement;
      root.style.setProperty('--cursor-x', `${e.clientX}px`);
      root.style.setProperty('--cursor-y', `${e.clientY}px`);

      const target = e.target;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );
      cursor.classList.toggle('cursor--active', !!interactive);
    };

    const onLeave = () => { cursor.style.display = 'none'; };
    const onEnter = () => { cursor.style.display = ''; };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true">
      <div className="cursor__ring" />
      <div className="cursor__dot" />
    </div>
  );
}
