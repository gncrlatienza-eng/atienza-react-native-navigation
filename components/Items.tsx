import React, { useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { Product, useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import ItemModal from './ItemModal';
import styles from '../styles/Items';

// Updated products data with local Ph prices and GB capacity
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '8GB Kingston Fury Impact',
    category: 'DDR4 3200MHz SODIMM',
    price: 2995,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
  },
  {
    id: '2',
    name: '16GB Lexar Laptop RAM',
    category: 'DDR4 3200MHz SODIMM',
    price: 5995,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400',
  },
  {
    id: '3',
    name: '16GB Crucial High-Speed',
    category: 'DDR5 4800MHz SODIMM',
    price: 7695,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
  },
  {
    id: '4',
    name: '16GB Kingston ValueRAM',
    category: 'DDR5 5600MHz SODIMM',
    price: 9895,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400',
  },
  {
    id: '5',
    name: '32GB Lexar Performance',
    category: 'DDR5 5600MHz SODIMM',
    price: 16995,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
  },
  {
    id: '6',
    name: '32GB Crucial Pro',
    category: 'DDR5 5600MHz SODIMM',
    price: 18995,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400',
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

  // Updated: Open modal instead of adding directly
  const handleAddToCartPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    // Add the product with the specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.cardBackground }]}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        {/* Full Spec Badge */}
        <Text style={{ 
          color: colors.primary, 
          fontSize: 20, 
          fontWeight: 'bold', 
          textTransform: 'uppercase' 
        }}>
          {item.category}
        </Text>
        
        <Text style={[styles.name, { color: colors.text, fontWeight: '600' }]} numberOfLines={2}>
          {item.name}
        </Text>
        
        {/* Price in PHP */}
        <Text style={[styles.price, { color: colors.primary, marginTop: 4 }]}>
          ₱{item.price.toLocaleString()}
        </Text>
      </View>
      
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => handleAddToCartPress(item)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
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