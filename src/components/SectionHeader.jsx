import Reveal from './Reveal';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ number, title, as: Heading = 'h2' }) {
  return (
    <Reveal className={styles.sectionHeader}>
      <div className={styles.sectionNumber}>{number}</div>
      <Heading className={styles.sectionTitle}>{title}</Heading>
    </Reveal>
  );
}
