import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

// Drives the page's smooth "glide" scroll. Mounted once near the root so
// every scroll — wheel, touch, or a programmatic scrollTo — goes through
// the same eased interpolation instead of jumping straight to place.
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // lerp mode: each frame, the scroll moves this fraction of the way to
      // its target, instead of running a fixed-length duration/easing tween.
      // That's what gives a continuous, velocity-responsive glide rather
      // than a "snap into a fixed-time animation" feel each time you stop.
      lerp: 0.12,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

// Scrolls to an element or selector through Lenis when it's active, falling
// back to native scrollIntoView (prefers-reduced-motion, or Lenis not yet
// mounted) so anchor navigation always works either way.
export function useLenisScrollTo() {
  const lenisRef = useContext(LenisContext);

  // Stable across renders (lenisRef is a ref, not a value) so it's safe to
  // list in a caller's effect dependency array without retriggering it.
  return useCallback(
    (target, options) => {
      const lenis = lenisRef?.current;
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, ...options });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: 'smooth' });
    },
    [lenisRef],
  );
}
