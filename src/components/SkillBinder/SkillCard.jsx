import { useRef, useState } from 'react';
import styles from './SkillBinder.module.css';

const pad = (n) => String(n).padStart(3, '0');

// The full type name is too wide to share a row with a long skill name, so
// the front pill uses an abbreviation; the back doesn't show a type pill
// at all, so it's never an issue there.
const TYPE_ABBR = { Language: 'LANG', Framework: 'FWK', Tool: 'TOOL', Certification: 'CERT' };

export default function SkillCard({ skill, index, tint, delay }) {
  const { name, short, mono, type, level, blurb } = skill;
  // The front has a lot less room than the back (it's sharing the header
  // row with the type pill), so a long official name — e.g. a certification
  // title — gets a shorter display name up front; the back always shows
  // the real, full name.
  const frontName = short || name;
  const isCore = level === 'Core';
  const isExploring = level === 'Exploring';
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [hot, setHot] = useState(false);

  // Mirrors the original's perf choice: tilt/glow vars are written straight
  // to the DOM on every pointermove instead of going through React state,
  // so a hover doesn't trigger a re-render per frame.
  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setHot(true);
    cardRef.current.style.setProperty('--rx', `${((0.5 - py) * 16).toFixed(2)}deg`);
    cardRef.current.style.setProperty('--ry', `${((px - 0.5) * 16).toFixed(2)}deg`);
    cardRef.current.style.setProperty('--gx', `${(px * 100).toFixed(0)}%`);
    cardRef.current.style.setProperty('--gy', `${(py * 100).toFixed(0)}%`);
  };

  const handlePointerOut = (e) => {
    if (cardRef.current?.contains(e.relatedTarget)) return;
    setHot(false);
    cardRef.current?.style.removeProperty('--rx');
    cardRef.current?.style.removeProperty('--ry');
  };

  return (
    <div className={styles.pocket}>
      <div className={styles.wrap} style={{ '--i': index }}>
        <button
          type="button"
          ref={cardRef}
          className={[
            styles.cardBtn,
            isCore && styles.core,
            isExploring && styles.exploring,
            hot && styles.hot,
            flipped && styles.flipped,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={flipped}
          aria-label={`Flip ${name}`}
          style={{ '--tint': tint }}
          onClick={() => setFlipped((f) => !f)}
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        >
          <span className={styles.card}>
            <span className={styles.face + ' ' + styles.front} aria-hidden={flipped}>
              <span className={styles.top}>
                <span className={`${styles.name} ${styles.frontName}`}>{frontName}</span>
                <span className={styles.type}>{TYPE_ABBR[type] || type.toUpperCase()}</span>
              </span>
              <span className={styles.art}>{mono}</span>
              <span className={styles.meta}>
                <span>No. {pad(index + 1)}</span>
                <span>{level.toUpperCase()}</span>
              </span>
              <span className={styles.shine}></span>
            </span>
            <span className={styles.face + ' ' + styles.back} aria-hidden={!flipped}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span className={styles.name}>{name}</span>
                <span className={styles.blurb}>{blurb}</span>
              </span>
              <span className={styles.meta}>
                <span>Level: {level}</span>
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
