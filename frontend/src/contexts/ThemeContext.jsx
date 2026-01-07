import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to dark mode (true)
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? saved === 'true' : true;
  });

  // Apply theme class to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());

    // Dispatch event for components that might not be using the context yet but listen to storage
    window.dispatchEvent(new CustomEvent('localStorageChange', {
      detail: { key: 'darkMode', newValue: isDarkMode.toString() }
    }));
  }, [isDarkMode]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'darkMode') {
        setIsDarkMode(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

