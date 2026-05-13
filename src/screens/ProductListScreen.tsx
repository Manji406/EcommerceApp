import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

import ProductCard from '../components/productcard';
import { Product } from '../types/product';
import { fetchProducts } from '../repositories/ProductRepository';
import axios from 'axios';

function ProductListScreen({ navigation }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    loadAllProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  async function loadAllProducts() {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={screenWidth / 2 - 16}
            onPress={product =>
              navigation.navigate('ProductDetail', { product })
            }
            onQuickBuy={product => console.log('Quick buy:', product.title)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    // Adds padding on Android only to account for the status bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: { paddingBottom: 20 },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});

export default ProductListScreen;
