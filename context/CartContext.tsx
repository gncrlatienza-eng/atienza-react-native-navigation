import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// CartItem extends Product with quantity
export interface CartItem extends Product {
  quantity: number;
}

// Context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, type: 'increment' | 'decrement') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add to cart (or increment if exists)
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Item exists, increment quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update quantity (increment or decrement)
  const updateQuantity = (id: string, type: 'increment' | 'decrement') => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
            
            // If quantity becomes 0, filter it out (handled below)
            if (newQuantity <= 0) {
              return null;
            }
            
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // Remove item completely
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Memoized total price calculation
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Memoized total items count
  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};