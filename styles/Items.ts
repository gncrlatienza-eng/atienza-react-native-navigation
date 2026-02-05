import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 16px padding on each side + 16px gap between cards

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: cardWidth * 0.75, // Maintain aspect ratio
    resizeMode: 'cover',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    margin: 12,
    marginTop: 0,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default styles;