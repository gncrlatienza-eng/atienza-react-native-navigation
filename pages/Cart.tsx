import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/Cart';
import { RootStackParamList } from '../App';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const Cart: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { colors } = useTheme();

  const handleIncrement = (id: string) => {
    updateQuantity(id, 'increment');
  };

  const handleDecrement = (id: string) => {
    updateQuantity(id, 'decrement');
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={[styles.cartItem, { backgroundColor: colors.cardBackground }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.itemCategory, { color: colors.textSecondary }]}>
          {item.category}
        </Text>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          ₱{item.price.toLocaleString()}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {/* Quantity Controls */}
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: colors.primary }]}
            onPress={() => handleDecrement(item.id)}
          >
            <Ionicons name="remove" size={18} color="#fff" />
          </TouchableOpacity>

          <Text style={[styles.quantity, { color: colors.text }]}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: colors.primary }]}
            onPress={() => handleIncrement(item.id)}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Subtotal */}
        <Text style={[styles.subtotal, { color: colors.text }]}>
          ₱{(item.price * item.quantity).toLocaleString()}
        </Text>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.text }]}>
        Your cart is empty
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
        Add some items to get started
      </Text>
      <TouchableOpacity
        style={[styles.shopButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Cart ({totalItems})
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Cart Items or Empty State */}
      {cart.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Footer with Total and Checkout */}
          <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.totalSection}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
                Total ({totalItems} items)
              </Text>
              <Text style={[styles.totalPrice, { color: colors.primary }]}>
                ₱{totalPrice.toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;