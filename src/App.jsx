import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

export default function App() {
  const { pathname, hash } = useLocation();

  // Home handles its own hash scrolling; every other navigation starts at the top.
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return (
    <>
      <Nav />
      <div key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}
