import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Cal from '@calcom/embed-react';
import nixoLogo from '../assets/logos/nixo-logo.png';
import { useTheme } from './ThemeProvider';

function useResolvedTheme() {
  const { theme } = useTheme();
  const [resolved, setResolved] = useState(() => {
    if (theme !== 'system') return theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme !== 'system') {
      setResolved(theme);
      return;
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setResolved(mql.matches ? 'dark' : 'light');
    const handler = (e) => setResolved(e.matches ? 'dark' : 'light');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  return resolved;
}

export default function Contact() {
  const resolvedTheme = useResolvedTheme();

  return (
    <section id="contact" className="relative pt-16 pb-12 px-6 overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nixo/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto">
        {/* Large Logo */}
        <img src={nixoLogo} alt="Nixo" className="w-24 h-24 object-contain mx-auto mb-4" />
        
        <div className="flex justify-center mb-6">
          <span className="badge badge-nixo">
            <Sparkles className="w-3.5 h-3.5" />
            Limited Early Access
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-2 tracking-tight text-center">
          Let's talk
        </h2>

        <p className="text-text-secondary max-w-md mx-auto text-center mb-6">
          Book a 15-min call with the team to see how Nixo can supercharge your forward deployed operations.
        </p>

        {/* Cal.com Inline Embed */}
        <div className="cal-embed-container mb-8">
          <Cal
            key={resolvedTheme}
            calLink="priya-nixo/15min"
            style={{
              width: "100%",
              height: "100%",
              overflow: "scroll"
            }}
            config={{
              layout: "month_view",
              theme: resolvedTheme,
            }}
          />
        </div>

        {/* Contact info */}
        <div className="text-center">
          <p className="text-text-muted text-sm mb-1">Prefer email?</p>
          <a href="mailto:team@withnixo.com" className="text-nixo-light hover:text-nixo transition-colors font-medium">
            team@withnixo.com
          </a>
        </div>
      </div>

      <style>{`
        .cal-embed-container {
          width: 100%;
          height: 600px;
          overflow: hidden;
          background: transparent;
        }
        .cal-embed-container iframe {
          border: none !important;
        }
      `}</style>
    </section>
  );
}
