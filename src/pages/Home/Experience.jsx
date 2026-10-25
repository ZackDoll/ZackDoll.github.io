import SectionHeader from '../../components/SectionHeader';
import Reveal from '../../components/Reveal';
import { experience } from '../../data/experience';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience">
      <SectionHeader number="02" title="Experience" />
      <div className={styles.timeline}>
        {experience.map((job, i) => (
          <Reveal as="article" className={styles.entry} key={job.id} delay={i * 100}>
            <div className={styles.entryHeader}>
              <div>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.company}>{job.company} · {job.location}</p>
              </div>
              <p className={styles.dates}>{job.start} – {job.end}</p>
            </div>
            <ul className={styles.bullets}>
              {job.bullets.map((bullet, bi) => (
                <li key={bi}>{bullet}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
