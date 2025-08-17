import React, { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';

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
  const { theme, toggleTheme } = useThemeStore();

  // Efecto para aplicar la clase al HTML cuando cambia el tema
  useEffect(() => {
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('theme-dark');
  }, [theme]);

  return (
    <div className="theme-toggle">
      <button
        onClick={toggleTheme}
        aria-pressed={theme === 'dark'}
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
          className={`icon light ${theme === 'dark' ? '' : 'active'}`}
          style={{
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            padding: '0.5rem',
            width: '2rem',
            height: '2rem',
            fontSize: '1rem',
            color: theme === 'dark' ? 'var(--accent-overlay)' : 'var(--accent-text-over)'
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
              transform: theme === 'dark' ? 'translateX(100%)' : 'none',
              transition: 'transform var(--theme-transition), color var(--theme-transition)'
            }}
          />
        </span>
        <span
          className={`icon dark ${theme === 'dark' ? 'active' : ''}`}
          style={{
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            padding: '0.5rem',
            width: '2rem',
            height: '2rem',
            fontSize: '1rem',
            color: theme === 'dark' ? 'var(--accent-text-over)' : 'var(--accent-overlay)',
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