import { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import WebGLBackground from './components/WebGLBackground';
import Cursor from './components/Cursor';
import Hero from './sections/Hero';
import Projects from './sections/Projects';

export default function App() {
  const [ready, setReady] = useState(false);

  /* ── scroll progress through the first viewport (0–1) ──
     Used by Hero for the clip-path transition to Projects.
     Derived from Lenis animatedScroll / window.innerHeight. */
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Lenis smooth scroll (DRL: Lenis + expo easing) ── */
  const lenisRef = useRef(null);

  const handleLenisScroll = useCallback((e) => {
    /* e.animatedScroll is the current Lenis scroll position.
       Map 0 → innerHeight to 0 → 1, clamped. */
    const progress = Math.min(1, e.animatedScroll / window.innerHeight);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    /* ── DRL pattern: Lenis scroll events drive section transitions ── */
    lenis.on('scroll', handleLenisScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return () => {
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
    };
  }, [handleLenisScroll]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current[ready ? 'start' : 'stop']();
    }
  }, [ready]);

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}

      <WebGLBackground />

      <main>
        <Hero scrollProgress={scrollProgress} />
        <Projects />
      </main>

      <Cursor />
    </>
  );
}
