import React, { useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { Product, useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import ItemModal from './ItemModal';
import styles from '../styles/Items';

// Sample products data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1696446702098-689c87aa0b90?w=400',
  },
  {
    id: '2',
    name: 'AirPods Pro',
    price: 249,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
  },
  {
    id: '3',
    name: 'MacBook Pro',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
  },
  {
    id: '4',
    name: 'Apple Watch',
    price: 399,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
  },
  {
    id: '5',
    name: 'iPad Air',
    price: 599,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
  },
  {
    id: '6',
    name: 'Magic Keyboard',
    price: 99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
  },
];

const Items: React.FC = () => {
  const { addToCart } = useCart();
  const { colors } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.cardBackground }]}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
      
      <ItemModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

export default Items;