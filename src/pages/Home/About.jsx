import Reveal from '../../components/Reveal';
import SectionHeader from '../../components/SectionHeader';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about">
      <SectionHeader number="01" title="About Me" />
      <div className={styles.aboutGrid}>
        <Reveal className={styles.aboutImage}>
          <img src="/images/ProfilePic.png" alt="Profile Picture" />
        </Reveal>
        <Reveal className={styles.aboutText} delay={120}>
          <p>
            I'm a computer science student at UCLA with a curiosity for building things that solve real
            problems, or just make life a little more fun. Most recently, I built a real-time ASL translator
            that uses computer vision and LSTMs to recognize sign language from webcam footage. Merging two
            separate datasets boosted its accuracy, and seeing it actually work for the first time was surreal.
          </p>
          <p>
            My GitHub is a collection of experiments and side projects, from Python scripts to full-stack web
            apps built with React and Node.js. One of my favorite projects was an MLB pitch predictor that
            analyzes over 12 million pitches to forecast what might happen next. I enjoy exploring new ideas,
            even if they don't always have a clear purpose: learning along the way is what matters.
          </p>
          <p>
            Outside of coding, I'm usually on a basketball court or baseball field, climbing rocks at a local
            gym, or just watching a game and debating plays with friends. I also spend plenty of late nights
            debugging or convincing myself that "just one more feature" won't take long, the highly desirable
            life of a programmer.
          </p>
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
        </Reveal>
      </div>
    </section>
  );
}
