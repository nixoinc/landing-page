import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import nixoLogo from '../assets/logos/nixo-logo.png';
import { useTheme } from './ThemeProvider';

const themeOptions = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const current = themeOptions.find((o) => o.value === theme) || themeOptions[2];
  const CurrentIcon = current.icon;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-4 h-4" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 bg-surface border border-border rounded-xl shadow-xl shadow-black/20 overflow-hidden min-w-[140px]"
          >
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    setTheme(opt.value);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'text-nixo bg-nixo/10'
                      : 'text-text-secondary hover:text-text hover:bg-surface-hover'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1 bg-surface-elevated rounded-xl p-1 w-full">
      {themeOptions.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-nixo/15 text-nixo'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function HashLink({ href, className, children, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    onClick?.();
    if (href.startsWith('#')) {
      e.preventDefault();
      if (location.pathname === '/') {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + href);
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const [hiringOpen, setHiringOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    {
      label: 'Hiring Hub',
      isDropdown: true,
      children: [
        { href: '/for-candidates', label: 'For Candidates' },
        { href: '/for-employers', label: 'For Employers' },
        { href: '/partner-program', label: 'Partner Program' },
      ],
    },
    { href: '/fde-wiki', label: 'FDE Wiki', isRoute: true },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-5xl mx-auto transition-all duration-300 ${
          scrolled 
            ? 'bg-surface/90 backdrop-blur-xl border border-border shadow-2xl shadow-black/20' 
            : 'bg-surface/50 backdrop-blur-md border border-border/50'
        } rounded-2xl`}
      >
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <img 
                src={nixoLogo} 
                alt="Nixo" 
                className="w-8 h-8 object-contain"
              />
            </motion.div>
            <span className="text-lg font-semibold text-text tracking-tight">
              Nixo
            </span>
          </Link>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                const isChildActive = link.children.some((c) => location.pathname === c.href);
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setHiringOpen(true)}
                    onMouseLeave={() => setHiringOpen(false)}
                  >
                    <button
                      className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors group ${
                        isChildActive ? 'text-nixo' : 'text-text-secondary hover:text-text'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 transition-transform ${hiringOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-nixo transition-all duration-300 rounded-full ${
                        isChildActive ? 'w-4' : 'w-0 group-hover:w-4'
                      }`} />
                    </button>
                    <AnimatePresence>
                      {hiringOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-1 bg-surface border border-border rounded-xl shadow-xl shadow-black/20 overflow-hidden min-w-[180px]"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => setHiringOpen(false)}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                location.pathname === child.href
                                  ? 'text-nixo bg-nixo/10'
                                  : 'text-text-secondary hover:text-text hover:bg-surface-hover'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              if (link.isRoute) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                      location.pathname === link.href ? 'text-nixo' : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-nixo transition-all duration-300 rounded-full ${
                      location.pathname === link.href ? 'w-4' : 'w-0 group-hover:w-4'
                    }`} />
                  </Link>
                );
              }
              return (
                <HashLink
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-text transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-nixo group-hover:w-4 transition-all duration-300 rounded-full" />
                </HashLink>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <HashLink
              href="#contact"
              className="inline-flex items-center gap-2 bg-nixo hover:bg-nixo-light text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Get Access
            </HashLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text transition-colors rounded-lg hover:bg-surface-elevated"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link, i) => {
                  if (link.isDropdown) {
                    return (
                      <motion.div key={link.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <div className="text-text-faded text-xs font-semibold uppercase tracking-wider py-2 px-4 mt-2">
                          {link.label}
                        </div>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setIsOpen(false)}
                            className={`block font-medium py-3 px-4 pl-6 rounded-xl transition-colors ${
                              location.pathname === child.href ? 'text-nixo bg-nixo/10' : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    );
                  }
                  if (link.isRoute) {
                    return (
                      <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`block font-medium py-3 px-4 rounded-xl transition-colors ${
                            location.pathname === link.href ? 'text-nixo bg-nixo/10' : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <HashLink
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-text-secondary hover:text-text transition-colors font-medium py-3 px-4 rounded-xl hover:bg-surface-elevated"
                      >
                        {link.label}
                      </HashLink>
                    </motion.div>
                  );
                })}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <HashLink
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-2 bg-nixo hover:bg-nixo-light text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors mt-2 w-full"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Get Access
                  </HashLink>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 py-2 px-4"
                >
                  <MobileThemeToggle />
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
