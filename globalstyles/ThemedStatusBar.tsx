import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemedStatusBar: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <StatusBar 
      barStyle={isDark ? 'light-content' : 'dark-content'}
      backgroundColor={isDark ? '#000000' : '#F5F5F7'}
      translucent={false}
    />
  );
};

export default ThemedStatusBar;