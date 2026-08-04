import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/gtag';
import styles from './Nav.module.css';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'blog', label: 'Blog' },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [active, setActive] = useState('home');
  const linksRef = useRef({});

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      if (document.body.classList.contains('viewing-blog')) return;
      let current = 'home';
      document.querySelectorAll('section[id]').forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.id;
        }
      });
      setActive(current);
    };

    window.addEventListener('scroll', onScroll);
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
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLogo}>Zachary Doll</Link>
      <ul>
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
            href="/files/Zachary_Doll_resume_Apr_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            Resume
          </a>
        </li>
        <li>
          <a href="/#contact" onClick={(e) => handleSectionClick(e, 'contact')}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
