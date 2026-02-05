import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/Navbar';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Navbar: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { totalItems } = useCart();
  const { colors, toggleTheme, isDark } = useTheme();

  return (
    <View style={[styles.navbar, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>RAM Store</Text>
      
      <View style={styles.rightSection}>
        {/* Theme Toggle */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleTheme}
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Cart Button */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart" size={28} color={colors.text} />
          {totalItems > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;