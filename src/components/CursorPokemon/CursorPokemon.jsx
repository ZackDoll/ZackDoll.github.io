import { useEffect, useRef } from 'react';
import styles from './CursorPokemon.module.css';

const DEADZONE = 150; // px — how close before it sits back down
const EASE = 0.005; // how quickly it catches up to the cursor — small, so it's a stroll
const MAX_STEP = 1.6; // px per frame cap, keeps the stroll slow even on big cursor jumps
const REACT_DELAY = 1500; // ms — how long the cursor has to stay away before it gets up
const IDLE_SPOT = { x: 100, y: 100 }; // resting corner before the cursor ever moves
const FRAME_INSET_RATIO = 0.01; // each edge is inset 1% of the window, so the frame spans ~98%
const SPRITE_W = 56;
const SPRITE_H = 49;

// Keeps a point within a frame that's inset from the current window size,
// so the critter never wanders past the edge of the viewport.
function clampToFrame(x, y) {
  const marginX = window.innerWidth * FRAME_INSET_RATIO;
  const marginY = window.innerHeight * FRAME_INSET_RATIO;
  const maxX = Math.max(marginX, window.innerWidth - marginX - SPRITE_W);
  const maxY = Math.max(marginY, window.innerHeight - marginY - SPRITE_H);
  return {
    x: Math.min(Math.max(x, marginX), maxX),
    y: Math.min(Math.max(y, marginY), maxY),
  };
}

// A small critter that idles in the corner, then walks/runs to keep up with
// the cursor. Pure CSS + rAF, no assets or animation libraries.
export default function CursorPokemon() {
  const rootRef = useRef(null);
  const legsRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || isCoarsePointer || !rootRef.current) return;

    const start = clampToFrame(IDLE_SPOT.x, IDLE_SPOT.y);
    const pos = { x: start.x, y: start.y };
    const target = { x: start.x, y: start.y };
    const cursor = { x: start.x, y: start.y }; // live cursor position, no delay
    let facing = 1;
    let walking = false;
    let hasMoved = false;
    let awaySince = null; // when the cursor first wandered out of the deadzone
    let raf;

    rootRef.current.classList.add(styles.sitting);

    const onMove = (e) => {
      hasMoved = true;
      // Trail slightly behind/below the cursor, like a pet at your heel.
      cursor.x = e.clientX - 34;
      cursor.y = e.clientY + 22;
    };

    const tick = () => {
      if (hasMoved) {
        // Never chase past the frame's edge — clamp before doing anything else.
        const framed = clampToFrame(cursor.x, cursor.y);

        if (walking) {
          // Already up and about: chase wherever the (framed) cursor is right now.
          target.x = framed.x;
          target.y = framed.y;
        } else {
          const strayDist = Math.hypot(framed.x - pos.x, framed.y - pos.y);
          if (strayDist > DEADZONE) {
            if (awaySince === null) awaySince = performance.now();
            if (performance.now() - awaySince >= REACT_DELAY) {
              walking = true;
              awaySince = null;
              target.x = framed.x;
              target.y = framed.y;
              rootRef.current.classList.add(styles.walking);
              rootRef.current.classList.remove(styles.sitting);
            }
          } else {
            awaySince = null;
          }
        }
      }

      if (walking) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist > DEADZONE) {
          const step = Math.min(dist * EASE, MAX_STEP);
          const ratio = step / dist;
          pos.x += dx * ratio;
          pos.y += dy * ratio;
          if (Math.abs(dx) > 1) facing = dx > 0 ? 1 : -1;
        } else {
          walking = false;
          rootRef.current.classList.remove(styles.walking);
          rootRef.current.classList.add(styles.sitting);
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
