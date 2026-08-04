import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroContent}>
          <p className={styles.heroRole}>Computer Science · UCLA</p>
          <h1 className={styles.heroTitle}>Zachary Doll</h1>
          <p className={styles.heroSubtitle}>Full-Stack, Machine Learning, and AI developer</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroMonogram}>ZD</div>
        </div>
      </div>
      <div className={styles.heroDecoration}>
        <span className={`${styles.heroCircle} ${styles.heroCircle1}`}></span>
        <span className={`${styles.heroCircle} ${styles.heroCircle2}`}></span>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
      </div>
    </section>
  );
}
