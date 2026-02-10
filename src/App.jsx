import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import Plasma from './components/Plasma';
import Home from './pages/Home';
import FDEWiki from './pages/FDEWiki';
import ForCandidates from './pages/ForCandidates';
import PartnerProgram from './pages/PartnerProgram';
import ForEmployers from './pages/ForEmployers';

// Hook to detect current theme
function useTheme() {
  const [isDark, setIsDark] = useState(!document.documentElement.classList.contains('light'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains('light'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for page to render, then scroll to the element
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const isDark = useTheme();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Plasma color - same brand pink for both modes
  const plasmaColor = '#C4287E';

  return (
    <BrowserRouter>
      <ScrollHandler />
      <div className="min-h-screen text-text relative">
        {/* Global Plasma Background */}
        <div className="fixed inset-0 z-0 plasma-wrap transition-all duration-500">
          <Plasma
            color={plasmaColor}
            speed={1}
            direction="forward"
            scale={1}
            opacity={1}
            mouseInteractive={true}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fde-wiki" element={<FDEWiki />} />
              <Route path="/for-candidates" element={<ForCandidates />} />
              <Route path="/partner-program" element={<PartnerProgram />} />
              <Route path="/for-employers" element={<ForEmployers />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
