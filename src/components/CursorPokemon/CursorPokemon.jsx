import { useEffect, useRef } from 'react';
import styles from './CursorPokemon.module.css';

const DEADZONE = 36; // px — how close before it stops "walking"
const EASE = 0.09; // how quickly it catches up to the cursor
const MAX_STEP = 14; // px per frame, keeps it from teleporting on fast mouse moves
const IDLE_SPOT = { x: 64, y: 64 }; // resting corner before the cursor ever moves

// A small critter that idles in the corner, then walks/runs to keep up with
// the cursor. Pure CSS + rAF, no assets or animation libraries.
export default function CursorPokemon() {
  const rootRef = useRef(null);
  const legsRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || isCoarsePointer || !rootRef.current) return;

    const pos = { x: IDLE_SPOT.x, y: IDLE_SPOT.y };
    const target = { x: IDLE_SPOT.x, y: IDLE_SPOT.y };
    let facing = 1;
    let walking = false;
    let hasMoved = false;
    let raf;

    const onMove = (e) => {
      hasMoved = true;
      // Trail slightly behind/below the cursor, like a pet at your heel.
      target.x = e.clientX - 34;
      target.y = e.clientY + 22;
    };

    const tick = () => {
      if (hasMoved) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist > DEADZONE) {
          const step = Math.min(dist * EASE, MAX_STEP);
          const ratio = step / dist;
          pos.x += dx * ratio;
          pos.y += dy * ratio;
          if (Math.abs(dx) > 1) facing = dx > 0 ? 1 : -1;
          if (!walking) {
            walking = true;
            rootRef.current.classList.add(styles.walking);
          }
        } else if (walking) {
          walking = false;
          rootRef.current.classList.remove(styles.walking);
        }
      }

      rootRef.current.style.transform =
        `translate3d(${pos.x}px, ${pos.y}px, 0) scaleX(${facing})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.critter} ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 64 56" width="56" height="49">
        {/* tail */}
        <polygon
          className={styles.tail}
          points="18,32 8,29 13,25 5,16 15,19 10,11 20,21 16,25"
        />
        {/* back leg */}
        <g className={`${styles.leg} ${styles.legBack}`}>
          <rect x="20" y="45" width="8" height="9" rx="3" />
        </g>
        {/* front leg */}
        <g className={`${styles.leg} ${styles.legFront}`}>
          <rect x="36" y="45" width="8" height="9" rx="3" />
        </g>
        {/* body */}
        <ellipse className={styles.body} cx="30" cy="36" rx="16" ry="13" />
        {/* head */}
        <circle className={styles.body} cx="42" cy="22" r="11" />
        {/* ears */}
        <polygon className={styles.earTip} points="34,14 37,1 40,15" />
        <polygon className={styles.earTip} points="49,14 53,0 52,16" />
        {/* cheek */}
        <circle className={styles.cheek} cx="35" cy="25" r="3" />
        {/* eye */}
        <circle className={styles.eye} cx="45" cy="19" r="2.1" />
      </svg>
    </div>
  );
}
