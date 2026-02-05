import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Items from '../components/Items';

const Homepage: React.FC = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar />
      <Items />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Homepage;