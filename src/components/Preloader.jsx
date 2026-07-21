import { useState, useEffect, useCallback } from 'react';
import './Preloader.css';

const WORD = 'OpenDesign';

export default function Preloader({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);

  const dismiss = useCallback(() => {
    setIsDismissing(true);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      setVisibleCount(WORD.length);
      const timer = setTimeout(dismiss, 600);
      return () => clearTimeout(timer);
    }

    // — stagger each letter with 65ms between —
    const letterTimers = WORD.split('').map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), i * 65)
    );

    // once all letters are visible, wait 1s then dismiss
    const totalAnim = WORD.length * 65 + 1000;
    const dismissTimer = setTimeout(dismiss, totalAnim);

    return () => {
      letterTimers.forEach(clearTimeout);
      clearTimeout(dismissTimer);
    };
  }, [dismiss]);

  return (
    <div
      className={`preloader${isDismissing ? ' preloader--hidden' : ''}`}
      role="status"
      aria-label="Loading OpenDesign"
    >
      <h1 className="preloader__word" aria-label={WORD}>
        {WORD.split('').map((letter, i) => (
          <span
            key={i}
            className={`preloader__letter${
              i < visibleCount ? ' preloader__letter--visible' : ''
            }`}
            aria-hidden="true"
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
