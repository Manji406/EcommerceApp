import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import ProductCard from '../components/productcard';
import { Product } from '../types/product';
import { fetchProducts } from '../repositories/ProductRepository';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';

function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* You can add Header, Search, Category chips here later */}
      <View style={styles.outerContainer}>
        <Text style ={styles.title}> Featured Products</Text>
<FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
        renderItem={({ item, index }) => (
          <ProductCard
            product={item}
            width={screenWidth / 2 - 12} // ← Pass dynamic width
            onPress={product =>
              navigation.navigate('ProductDetail', { product })
            }
            onQuickBuy={product => console.log('Quick buy:', product.title)}
            onImageError={err => console.log(err)}
          />
        )}
      />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
outerContainer: {
    paddingBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 8, // Added padding to the container
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16, // This creates the gap between title and products
    marginTop: 10,
    paddingHorizontal: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
