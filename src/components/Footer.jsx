import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://www.github.com/ZackDoll' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zack-doll-6952b8272' },
];

export default function Footer({ variant = 'home' }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p>
        {variant === 'home'
          ? '© 2025 Zachary Doll'
          : '© 2025 // built with passion and too much free time'}
      </p>
    </footer>
  );
}
