import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import nixoLogo from '../assets/logos/nixo-logo.png';

function FooterHashLink({ hash, children, className }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + hash);
    }
  };

  return (
    <a href={hash} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}


export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-void/80 backdrop-blur-sm">
      
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img 
                src={nixoLogo} 
                alt="Nixo" 
                className="w-8 h-8 object-contain"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              />
              <span className="text-lg font-semibold text-text tracking-tight">Nixo</span>
            </Link>
            <p className="text-sm text-text-faded">
              © {new Date().getFullYear()} Nixo Inc. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <FooterHashLink hash="#features" className="text-text-muted hover:text-text transition-colors text-sm font-medium">Features</FooterHashLink>
            <FooterHashLink hash="#integrations" className="text-text-muted hover:text-text transition-colors text-sm font-medium">Integrations</FooterHashLink>
            <Link to="/fde-wiki" className="text-text-muted hover:text-text transition-colors text-sm font-medium">The FDE Wiki</Link>
            <FooterHashLink hash="#contact" className="text-text-muted hover:text-text transition-colors text-sm font-medium">Contact</FooterHashLink>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/withnixo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border hover:border-nixo/50 hover:bg-nixo/10 flex items-center justify-center transition-all group"
            >
              <svg className="w-4 h-4 text-text-muted group-hover:text-nixo-light transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/withnixo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border hover:border-nixo/50 hover:bg-nixo/10 flex items-center justify-center transition-all group"
            >
              <svg className="w-4 h-4 text-text-muted group-hover:text-nixo-light transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
