import styles from './Footer.module.css';

export default function Footer({ variant = 'home' }) {
  return (
    <footer className={styles.footer}>
      <p>
        {variant === 'home'
          ? '© 2025 Zachary Doll'
          : '© 2025 // built with passion and too much free time'}
      </p>
    </footer>
  );
}
