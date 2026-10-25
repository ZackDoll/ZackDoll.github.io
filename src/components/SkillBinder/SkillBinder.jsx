import { useEffect, useRef, useState } from 'react';
import SkillCard from './SkillCard';
import { SKILLS, TYPE_TINT } from '../../data/skillBinder';
import styles from './SkillBinder.module.css';

const OPEN_DELAY = 700; // ms — pause after scrolling into view before it pops open

export default function SkillBinder() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Auto-opens once the binder scrolls into view, after a short pause —
  // no tap required. Reduced-motion visitors skip straight to open.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setOpen(true);
      return;
    }

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setOpen(true), OPEN_DELAY);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.binderWrap} ref={wrapRef}>
      <div className={styles.binder}>
        <div className={styles.spine} aria-hidden="true">
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
        </div>
        <div className={`${styles.page} ${!open ? styles.closed : ''}`}>
          {open &&
            SKILLS.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} tint={TYPE_TINT[skill.type] || '#5BC0F8'} />
            ))}
          {!open && (
            <div className={styles.scrim}>
              <div className={styles.pack} aria-hidden="true">
                <span className={styles.crimp}></span>
                <span className={styles.packLabel}>
                  <b>Skills</b>
                  <span>Opening&hellip;</span>
                </span>
                <span className={styles.crimp}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
