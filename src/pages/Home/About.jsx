import SectionHeader from '../../components/SectionHeader';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about">
      <SectionHeader number="01" title="About Me" />
      <div className={styles.aboutGrid}>
        <div className={styles.aboutImage}>
          <img src="/images/ProfilePic.png" alt="Profile Picture" />
        </div>
        <div className={styles.aboutText}>
          <div className={styles.aboutStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>3</div>
              <div className={styles.statLabel}>Years Exp</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
