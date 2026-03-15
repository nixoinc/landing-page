import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import CosmicBackground from './components/CosmicBackground';

const Home = lazy(() => import('./pages/Home'));
const FDEWiki = lazy(() => import('./pages/FDEWiki'));
const ForCandidates = lazy(() => import('./pages/ForCandidates'));
const PartnerProgram = lazy(() => import('./pages/PartnerProgram'));
const ForEmployers = lazy(() => import('./pages/ForEmployers'));


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

  return (
    <BrowserRouter>
      <ScrollHandler />
      <div className="min-h-screen text-text relative">
        {/* Global Background */}
        <CosmicBackground />
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fde-wiki" element={<FDEWiki />} />
                <Route path="/for-candidates" element={<ForCandidates />} />
                <Route path="/partner-program" element={<PartnerProgram />} />
                <Route path="/for-employers" element={<ForEmployers />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

