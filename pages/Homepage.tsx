import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Items from '../components/Items';

const Homepage: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <Items searchQuery={searchQuery} />
    </SafeAreaView>
  );
};

export default Homepage;