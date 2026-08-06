import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembersPage from './pages/MembersPage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';

/**
 * Routing does not restore scroll on its own. On a normal navigation go to the
 * top; when the URL carries a hash (the home-page anchors), scroll to it once
 * the target has mounted.
 */
function ScrollBehaviour() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollBehaviour />
      <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
