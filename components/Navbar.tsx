import React from 'react';
import { View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
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
    <View style={[
      styles.navbar, 
      { 
        backgroundColor: 'transparent',
        paddingTop: Platform.OS === 'ios' ? (StatusBar.currentHeight || 44) : StatusBar.currentHeight || 0,
      }
    ]}>
      <BlurView 
        intensity={isDark ? 80 : 95}
        tint={isDark ? 'dark' : 'light'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 12,
      }}>
        <Text style={[
          styles.title, 
          { 
            color: colors.text,
            fontSize: 34,
            fontWeight: '700',
            letterSpacing: 0.4,
          }
        ]}>
          RAM Store
        </Text>
        
        <View style={styles.rightSection}>
          {/* Theme Toggle */}
          <TouchableOpacity
            style={[
              styles.iconButton,
              {
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                justifyContent: 'center',
                alignItems: 'center',
              }
            ]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>

          {/* Cart Button */}
          <TouchableOpacity
            style={[
              styles.cartButton,
              {
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 12,
              }
            ]}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="cart" size={22} color={colors.text} />
            {totalItems > 0 && (
              <View style={[
                styles.badge, 
                { 
                  backgroundColor: colors.primary,
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  minWidth: 20,
                  height: 20,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: isDark ? '#000' : '#F5F5F7',
                }
              ]}>
                <Text style={[
                  styles.badgeText,
                  {
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: '700',
                  }
                ]}>
                  {totalItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Navbar;