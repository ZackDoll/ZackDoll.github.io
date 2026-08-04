import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import BlogIndex from './pages/BlogIndex/BlogIndex';
import BlogPost from './pages/BlogPost/BlogPost';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
