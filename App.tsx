import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemedStatusBar from './globalstyles/ThemedStatusBar';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';

// Define navigation types
export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Homepage} />
            <Stack.Screen name="Cart" component={Cart} />
            {/* Checkout screen will be added later */}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ThemeProvider>
  );
}