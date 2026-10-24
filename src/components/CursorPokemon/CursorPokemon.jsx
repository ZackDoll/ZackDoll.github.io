import { useEffect, useRef, useState } from 'react';
import SpriteFrame from './SpriteFrame';
import { ALL_SPRITE_URLS, directionFromVector, framesFor, mirrorFor, pickSleepFrame, roarFrames } from './spriteManifest';
import styles from './CursorPokemon.module.css';

const DEADZONE = 150; // px — how close before it sits back down
const EASE = 0.005; // how quickly it catches up to the cursor — small, so it's a stroll
const MAX_STEP = 1.6; // px per frame cap, keeps the stroll slow even on big cursor jumps
const REACT_DELAY = 1500; // ms — how long the cursor has to stay away before it gets up
const SLEEP_DELAY = 5000; // ms — how long it sits still before dozing off
const WALK_FRAME_INTERVAL = 140; // ms per run-cycle frame
const ROAR_FRAME_INTERVAL = 150; // ms per roar frame
const ROAR_DURATION = ROAR_FRAME_INTERVAL * 4; // one pass through the 4 roar frames
const IDLE_SPOT = { x: 100, y: 100 }; // resting corner before the cursor ever moves
const FRAME_INSET_RATIO = 0.01; // each edge is inset 1% of the window, so the frame spans ~98%
const SPRITE_W = 50;
const SPRITE_H = 38;

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

// Preload every sprite frame once so switching direction/pose never pops in
// a blank image while the browser fetches it for the first time.
function preloadSprites() {
  ALL_SPRITE_URLS.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// A real Mudkip sprite that sits in the corner, dozes off if left alone long
// enough, and wakes up to stroll toward the cursor once it wanders far
// enough away for long enough.
export default function CursorPokemon() {
  const rootRef = useRef(null);
  const [direction, setDirection] = useState('down');
  const [pose, setPose] = useState('sit');
  const [frameIndex, setFrameIndex] = useState(0);
  const [sleepFrame, setSleepFrame] = useState(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || isCoarsePointer || !rootRef.current) return;

    preloadSprites();

    const start = clampToFrame(IDLE_SPOT.x, IDLE_SPOT.y);
    const pos = { x: start.x, y: start.y };
    const target = { x: start.x, y: start.y };
    const cursor = { x: start.x, y: start.y }; // live cursor position, no delay
    let walking = false;
    let hasMoved = false;
    let awaySince = null; // when the cursor first wandered out of the deadzone
    let sittingSince = performance.now();
    let lastFrameAt = 0;
    let facingMirror = false;
    let wasAsleep = false;
    let roaring = false;
    let roarEndAt = 0;
    let raf;

    const onMove = (e) => {
      hasMoved = true;
      // Trail slightly behind/below the cursor, like a pet at your heel.
      cursor.x = e.clientX - 20;
      cursor.y = e.clientY + 14;
    };

    const onClick = () => {
      if (roaring) return; // ignore re-clicks mid-animation
      roaring = true;
      wasAsleep = false; // a click "wakes" it either way
      roarEndAt = performance.now() + ROAR_DURATION;
      lastFrameAt = performance.now();
      setFrameIndex(0);
      setPose('roar');
    };

    const tick = () => {
      const now = performance.now();

      if (roaring) {
        if (now - lastFrameAt >= ROAR_FRAME_INTERVAL) {
          lastFrameAt = now;
          setFrameIndex((i) => (i + 1) % roarFrames().length);
        }
        if (now >= roarEndAt) {
          roaring = false;
          setFrameIndex(0);
          if (walking) {
            setPose('walk');
          } else {
            sittingSince = now; // interacting with it resets the doze-off clock
            setPose('sit');
          }
        }
        rootRef.current.style.transform =
          `translate3d(${pos.x}px, ${pos.y}px, 0) scaleX(${facingMirror ? -1 : 1})`;
        raf = requestAnimationFrame(tick);
        return;
      }

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
            if (awaySince === null) awaySince = now;
            if (now - awaySince >= REACT_DELAY) {
              walking = true;
              awaySince = null;
              wasAsleep = false;
              target.x = framed.x;
              target.y = framed.y;
              setFrameIndex(0);
              setPose('walk');
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
          const stepLen = Math.min(dist * EASE, MAX_STEP);
          const ratio = stepLen / dist;
          pos.x += dx * ratio;
          pos.y += dy * ratio;

          const dir = directionFromVector(dx, dy);
          facingMirror = mirrorFor(dir, 'walk');
          setDirection(dir);

          if (now - lastFrameAt >= WALK_FRAME_INTERVAL) {
            lastFrameAt = now;
            setFrameIndex((i) => (i + 1) % framesFor(dir, 'walk').length);
          }
        } else {
          walking = false;
          sittingSince = now;
          facingMirror = false;
          wasAsleep = false;
          setFrameIndex(0);
          setPose('sit');
        }
      } else if (hasMoved) {
        // Sitting still: doze off after a long enough stretch of quiet.
        // Picks one of the sleeping poses at random the moment it drifts
        // off, rather than cycling between them.
        const asleep = now - sittingSince >= SLEEP_DELAY;
        if (asleep && !wasAsleep) {
          wasAsleep = true;
          setSleepFrame(pickSleepFrame());
        }
        setPose((current) => {
          if (current === 'walk') return current;
          return asleep ? 'sleep' : 'sit';
        });
      }

      rootRef.current.style.transform =
        `translate3d(${pos.x}px, ${pos.y}px, 0) scaleX(${facingMirror ? -1 : 1})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    rootRef.current.addEventListener('click', onClick);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      rootRef.current?.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let frame;
  if (pose === 'sleep') {
    frame = sleepFrame;
  } else if (pose === 'roar') {
    const frames = roarFrames();
    frame = frames[frameIndex % frames.length];
  } else {
    const frames = framesFor(direction, pose);
    frame = frames[frameIndex % frames.length];
  }

  return (
    <div className={styles.critter} data-pose={pose} ref={rootRef} aria-hidden="true">
      <SpriteFrame frame={frame} />
      {pose === 'sleep' && <span className={styles.zzz}>Z</span>}
    </div>
  );
}
