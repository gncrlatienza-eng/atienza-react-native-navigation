import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/Checkout';
import { RootStackParamList } from '../App';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

const Checkout: React.FC = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const { cart, totalPrice, clearCart } = useCart();
  const { colors } = useTheme();

  // Static user information
  const userInfo = {
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '+63 912 345 6789',
  };

  const shippingAddress = {
    street: '123 Rizal Street, Brgy. San Antonio',
    city: 'Makati City',
    region: 'Metro Manila',
    zipCode: '1203',
    country: 'Philippines',
  };

  const paymentMethod = {
    type: 'Credit Card',
    cardNumber: '**** **** **** 4532',
    cardHolder: 'Juan Dela Cruz',
  };

  // Pricing calculations
  const subtotal = totalPrice;
  const deliveryFee = 150;
  const tax = subtotal * 0.12; // 12% VAT in PH
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Successful',
      'Your order has been placed successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Contact Information */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={22} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Information</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Name</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{userInfo.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{userInfo.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Phone</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{userInfo.phone}</Text>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={22} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Shipping Address</Text>
          </View>
          <Text style={[styles.addressText, { color: colors.text }]}>
            {shippingAddress.street}
          </Text>
          <Text style={[styles.addressText, { color: colors.text }]}>
            {shippingAddress.city}, {shippingAddress.region}
          </Text>
          <Text style={[styles.addressText, { color: colors.text }]}>
            {shippingAddress.zipCode}, {shippingAddress.country}
          </Text>
        </View>

        {/* Payment Method */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card-outline" size={22} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Ionicons name="card" size={32} color={colors.primary} />
            <View style={styles.paymentDetails}>
              <Text style={[styles.paymentType, { color: colors.text }]}>{paymentMethod.type}</Text>
              <Text style={[styles.cardNumber, { color: colors.textSecondary }]}>
                {paymentMethod.cardNumber}
              </Text>
              <Text style={[styles.cardHolder, { color: colors.textSecondary }]}>
                {paymentMethod.cardHolder}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bag-outline" size={22} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Items</Text>
          </View>
          {cart.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={[styles.itemCategory, { color: colors.textSecondary }]}>
                  {item.category}
                </Text>
                <Text style={[styles.itemQuantity, { color: colors.textSecondary }]}>
                  Qty: {item.quantity}
                </Text>
              </View>
              <Text style={[styles.itemPrice, { color: colors.text }]}>
                ₱{(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>
            Order Summary
          </Text>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Subtotal</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              ₱{subtotal.toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Delivery Fee</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              ₱{deliveryFee.toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Tax (12% VAT)</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              ₱{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              ₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        {/* Add padding at bottom for checkout button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Checkout Button */}
      <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>
            Place Order - ₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;