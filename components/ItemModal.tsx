import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ItemModal';

interface ItemModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  visible,
  product,
  onClose,
  onAddToCart,
}) => {
  const { colors } = useTheme();

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.cardBackground }]}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>

          {/* Product Image */}
          <Image source={{ uri: product.image }} style={styles.image} />

          {/* Product Name */}
          <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>

          {/* Product Price */}
          <Text style={[styles.price, { color: colors.primary }]}>
            ${product.price.toFixed(2)}
          </Text>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ItemModal;