import { useEffect, useRef } from 'react';
import './Hero.css';

/* ─────────────────────────────────────────────────────────
   SCROLL JOURNEY — Section 1 of 2 (Hero)

   SECTION: Hero (sticky, 0–100vh scroll range)
   ─────────────────────────────────────────────────────────
   scroll_range: 0 to 100vh (sticky while user scrolls through it)
   trigger: preloader dismiss → auto-animate in
   elements: 
     - "Open" (top-left, rotated -2.5°, stagger letters 65ms)
     - "Design" (bottom-right, rotated +3°, stagger letters 65ms)
     - subtitle (middle-left, fade-in 700ms)
     - CTA (bottom-left, split-text hover, fade-in 1.1s)
     - scroll indicator (bottom-centre, fade-in 2.2s)
   stagger: letters 65ms per char (matching preloader), subtitle/CTA/indicator
            at 0.3s/0.5s/0.7s/1.1s/2.2s offsets
   section_transition: clip-path inset() closes from bottom as
                       --scroll-progress goes 0 → 1 (scroll down).
                       Reverses when scrolling up (scroll direction matters).

   DRL patterns used:
   - --ease-expo: cubic-bezier(0.19, 1, 0.22, 1) — consistent easing
   - preloader-as-identity: 65ms per letter stagger (matches Preloader.jsx)
   - split-text hover: translateY swap on CTA (800ms expo-out)
   - background-clip text fill gradient on title letters
   - section-scoped theming via CSS custom properties
   ───────────────────────────────────────────────────────── */

export default function Hero({ scrollProgress = 0 }) {
  const wrapperRef = useRef(null);

  /* Sync scroll-progress to CSS custom property + data attribute.
     The data attribute on the wrapper lets CSS react to scroll state
     (e.g. hide scroll indicator once user has scrolled). */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.setProperty('--scroll-progress', scrollProgress);
    el.dataset.scrolled = scrollProgress > 0.02 ? 'true' : 'false';
  }, [scrollProgress]);

  /* ── helper: split text into word spans with stagger index ── */
  const renderWords = (text, offset = 0) =>
    text.split(' ').flatMap((word, i) => {
      const el = (
        <span
          key={i + offset}
          className="hero__subtitle-word"
          style={{ '--word-index': i + offset }}
        >
          {word}
        </span>
      );
      return i === 0 ? [el] : [' ', el];
    });

  return (
    <div className="hero-wrapper" ref={wrapperRef}>
      <section className="hero" aria-label="Hero">
        <h1 className="hero__title">
          <span className="hero__open hero__word" data-word="Open">
            {'Open'.split('').map((char, i) => (
              <span
                key={i}
                className="hero__char"
                style={{ '--char-index': i }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="hero__design hero__word" data-word="Design">
            {'Design'.split('').map((char, i) => (
              <span
                key={i}
                className="hero__char"
                style={{ '--char-index': i }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero__subtitle">
          {renderWords(
            'The open-source design system that scales with your team.'
          )}
          <br />
          {renderWords(
            'From tokens to components — design at the speed of thought.',
            100
          )}
        </p>

        <button className="hero__cta" type="button">
          <span className="hero__cta-text" aria-hidden="true">
            Explore the system
          </span>
          <span
            className="hero__cta-text hero__cta-text--hover"
            aria-hidden="true"
          >
            Explore the system
          </span>
          <span className="sr-only">Explore the system</span>
        </button>

        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
        </div>
      </section>
    </div>
  );
}
