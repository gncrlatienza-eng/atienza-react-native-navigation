import React, { useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ItemModal';

interface ItemModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  visible,
  product,
  onClose,
  onAddToCart,
}) => {
  const { colors } = useTheme();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when modal opens
  React.useEffect(() => {
    if (visible) {
      setQuantity(1);
    }
  }, [visible]);

  if (!product) return null;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

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

          {/* Product category */}
          <Text style={[styles.subname, { color: colors.text }]}>{product.category}</Text>

          {/* Product Price */}
          <Text style={[styles.price, { color: colors.primary }]}>
            ₱{product.price.toLocaleString()} each
          </Text>

          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: colors.primary }]}
              onPress={handleDecrement}
            >
              <Ionicons name="remove" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={[styles.quantityText, { color: colors.text }]}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: colors.primary }]}
              onPress={handleIncrement}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Total Price */}
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
            <Text style={[styles.totalPrice, { color: colors.primary }]}>
              ₱{totalPrice.toLocaleString()}
            </Text>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddToCart}
          >
            <Text style={styles.addButtonText}>Add {quantity} to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ItemModal;