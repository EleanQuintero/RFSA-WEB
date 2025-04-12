import React, { useEffect, useState } from 'react';

// Creamos un componente Icon simplificado para usar en nuestro ThemeToggle
interface IconProps {
  icon: 'sun' | 'moon-stars';
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  const iconPaths: Record<string, React.ReactNode> = {
    'sun': (
      <>
        <circle cx="128" cy="128" r="60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M128 36V16M63 63 49 49m-13 79H16m47 65-14 14m79 13v20m65-47 14 14m13-79h20m-47-65 14-14"/>
      </>
    ),
    'moon-stars': (
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M216 112V64m24 24h-48m-24-64v32m16-16h-32m65 113A92 92 0 0 1 103 39h0a92 92 0 1 0 114 114Z"/>
    )
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 256 256"
      aria-hidden="true"
      stroke="currentColor"
      fill="currentColor"
      style={{ verticalAlign: 'middle', width: '1em', height: '1em' }}
    >
      {iconPaths[icon]}
    </svg>
  );
};

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // Función para verificar si actualmente está en modo oscuro
  const checkIsDark = (): boolean => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('theme-dark');
    }
    return false;
  };

  // Función para establecer el tema
  const setTheme = (dark: boolean) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList[dark ? 'add' : 'remove']('theme-dark');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      setIsDark(dark);
    }
  };

  // Inicializar el estado del tema al cargar el componente
  useEffect(() => {
    setIsDark(checkIsDark());
  }, []);

  // Manejador para alternar el tema
  const toggleTheme = () => {
    setTheme(!isDark);
  };

  return (
    <div className="theme-toggle">
      <button
        onClick={toggleTheme}
        aria-pressed={isDark}
        style={{
          display: 'flex',
          border: 0,
          borderRadius: '999rem',
          padding: 0,
          backgroundColor: 'var(--gray-999)',
          boxShadow: 'inset 0 0 0 1px var(--accent-overlay)',
          cursor: 'pointer'
        }}
      >
        <span className="sr-only">Dark theme</span>
        <span
          className={`icon light ${isDark ? '' : 'active'}`}
          style={{
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            padding: '0.5rem',
            width: '2rem',
            height: '2rem',
            fontSize: '1rem',
            color: isDark ? 'var(--accent-overlay)' : 'var(--accent-text-over)'
          }}
        >
          <Icon icon="sun" />
          <span
            style={{
              content: '""',
              zIndex: -1,
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--accent-regular)',
              borderRadius: '999rem',
              transform: isDark ? 'translateX(100%)' : 'none',
              transition: 'transform var(--theme-transition), color var(--theme-transition)'
            }}
          />
        </span>
        <span
          className={`icon dark ${isDark ? 'active' : ''}`}
          style={{
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            padding: '0.5rem',
            width: '2rem',
            height: '2rem',
            fontSize: '1rem',
            color: isDark ? 'var(--accent-text-over)' : 'var(--accent-overlay)',
            transition: 'color var(--theme-transition)'
          }}
        >
          <Icon icon="moon-stars" />
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle; 