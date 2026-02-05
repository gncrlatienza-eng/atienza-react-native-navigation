import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Items from '../components/Items';

const Homepage: React.FC = () => {
  const { colors } = useTheme();

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // You can implement search logic here later
    // For now, it just logs the search query
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <Items />
    </SafeAreaView>
  );
};

export default Homepage;