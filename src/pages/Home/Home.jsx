import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenisScrollTo } from '../../components/SmoothScroll';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Footer from '../../components/Footer';

export default function Home() {
  const location = useLocation();
  const scrollTo = useLenisScrollTo();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      scrollTo(target);
    }
  }, [location.hash, scrollTo]);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Footer variant="home" />
    </>
  );
}
