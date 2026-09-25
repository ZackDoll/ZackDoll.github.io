import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/gtag';
import styles from './Nav.module.css';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState(null);
  const linksRef = useRef({});
  const listRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const link = isHome ? linksRef.current[active] : null;
    if (!link) {
      setIndicator(null);
      return;
    }
    const place = () => setIndicator({ left: link.offsetLeft, width: link.offsetWidth });
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active, isHome]);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      let current = 'home';
      document.querySelectorAll('section[id]').forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.id;
        }
      });
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const handleSectionClick = (e, id) => {
    trackEvent('navigation_click', {
      section: id,
      event_category: 'navigation',
      event_label: id,
    });

    if (isHome) {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setActive(id);
      }
    } else {
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.navLogo}>Zachary Doll</Link>
      <ul ref={listRef}>
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`/#${section.id}`}
              ref={(el) => { linksRef.current[section.id] = el; }}
              className={isHome && active === section.id ? styles.active : ''}
              onClick={(e) => handleSectionClick(e, section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="/files/Zachary_Doll_Resume_Sep_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            Resume
          </a>
        </li>
        {indicator && (
          <span
            className={styles.indicator}
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
          />
        )}
      </ul>
    </nav>
  );
}
