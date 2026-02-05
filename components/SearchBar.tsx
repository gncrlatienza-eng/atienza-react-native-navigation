import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/SearchBar';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search RAM products...' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors, isDark } = useTheme();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: isDark ? 'rgba(118, 118, 128, 0.24)' : 'rgba(142, 142, 147, 0.12)',
        paddingVertical: 10,
        paddingHorizontal: 12,
      }
    ]}>
      <Ionicons 
        name="search" 
        size={18} 
        color={isDark ? 'rgba(235, 235, 245, 0.6)' : 'rgba(60, 60, 67, 0.6)'} 
        style={styles.searchIcon}
      />
      
      <TextInput
        style={[
          styles.input,
          { 
            color: colors.text,
            paddingVertical: 8,
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDark ? 'rgba(235, 235, 245, 0.6)' : 'rgba(60, 60, 67, 0.6)'}
        value={searchQuery}
        onChangeText={handleSearch}
        clearButtonMode="never"
        returnKeyType="search"
      />
      
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <View style={[
            styles.clearButtonBackground,
            { backgroundColor: isDark ? 'rgba(235, 235, 245, 0.3)' : 'rgba(60, 60, 67, 0.3)' }
          ]}>
            <Ionicons 
              name="close" 
              size={14} 
              color={isDark ? '#fff' : '#000'} 
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;