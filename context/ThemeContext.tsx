import React, { createContext, useContext, useState, ReactNode } from 'react';

// Theme type
export type ThemeType = 'light' | 'dark';

// Theme colors
export interface ThemeColors {
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  shadow: string;
}

// Light theme colors
const lightTheme: ThemeColors = {
  background: '#F5F5F7',
  cardBackground: '#FFFFFF',
  text: '#000000',
  textSecondary: '#6E6E73',
  primary: '#007AFF',
  border: '#D1D1D6',
  shadow: '#000000',
};

// Dark theme colors
const darkTheme: ThemeColors = {
  background: '#000000',
  cardBackground: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  primary: '#0A84FF',
  border: '#38383A',
  shadow: '#FFFFFF',
};

// Context type
interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};