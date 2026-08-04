import styles from './SectionHeader.module.css';

export default function SectionHeader({ number, title, as: Heading = 'h2' }) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionNumber}>{number}</div>
      <Heading className={styles.sectionTitle}>{title}</Heading>
    </div>
  );
}
