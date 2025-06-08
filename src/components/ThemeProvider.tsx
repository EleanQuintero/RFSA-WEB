import { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Si no hay tema guardado, usar la preferencia del sistema
    if (!localStorage.getItem('theme-storage')) {
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Aplicar la clase inicial
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('theme-dark');
  }, []);

  return <>{children}</>;
}; 