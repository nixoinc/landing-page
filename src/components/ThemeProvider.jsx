import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'system', setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nixo-theme') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (resolved) => {
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
      root.style.colorScheme = resolved;

      // Favicon is transparent PNG — works for both themes

      // Update theme-color meta
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.content = resolved === 'dark' ? '#09090B' : '#FFFFFF';
      }
    };

    const getSystemTheme = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const resolved = theme === 'system' ? getSystemTheme() : theme;
    applyTheme(resolved);
    localStorage.setItem('nixo-theme', theme);

    // Listen for system changes when in system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(getSystemTheme());
      }
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
