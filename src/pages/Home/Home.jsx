import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Footer from '../../components/Footer';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer variant="home" />
    </>
  );
}
