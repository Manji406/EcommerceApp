import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ProgressiveImage } from '../Image/ProgressiveImage';
import { Product } from '../../types/product'; // adjust path as needed

type ProductCardProps = {
  product: Product;
  width: number;
  onPress: (product: Product) => void;
  onQuickBuy?: (product: Product) => void;
  onImageError?: (error: Error) => void;
};

const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  width,
  onPress,
  onQuickBuy,
  onImageError,
}) => {
  const imageSize = width - 16; // Symmetric square image

  const handlePress = useCallback(() => onPress(product), [onPress, product]);
  const handleQuickBuy = useCallback((e: any) => {
    e.stopPropagation();
    onQuickBuy?.(product);
  }, [onQuickBuy, product]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: width },
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
      onLongPress={() => console.log('Long press:', product.title)}
      delayLongPress={500}
    >
      {/* Image Container - Square */}
      <View style={[styles.imageContainer, { height: imageSize }]}>
        
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Discount Badge */}
        {product.discountPercentage && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discountPercentage}%</Text>
          </View>
        )}

        {/* Quick Buy Button */}
        {onQuickBuy && (
          <TouchableOpacity
            style={styles.quickBuyContainer}
            onPress={handleQuickBuy}
            activeOpacity={0.8}
          >
            <Text style={styles.quickBuyText}>Quick Buy</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>

          {product.rating > 0 && (
            <Text style={styles.rating}>
              ⭐ {product.rating}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  discountText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  quickBuyContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  quickBuyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1C',
    marginBottom: 6,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  rating: {
    fontSize: 13,
    color: '#666',
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
});

export default ProductCard;