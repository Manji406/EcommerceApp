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

import { Banner } from '../types/banner';
import { fetchBanners } from '../repositories/BannerRepository';
import { BannerSlider } from '../components/BannerSlider';

import { Categories as CategoryType } from '../types/categories';
import { fetchCategories } from '../repositories/CategoryRepository';

// ✅ Make sure this import is correct
import { CategoryTags } from '../components/CategoryTags';

function HomeScreen({ navigation }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    try {
      const [productsData, bannersData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchBanners(),
        fetchCategories(),
      ]);

      setProducts(productsData);
      setBanners(bannersData);
      setCategories(categoriesData);
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  const renderHeader = useCallback(() => (
    <View style={{ flex: 0 }}>
      <CategoryTags data={categories} />
      <BannerSlider data={banners} />

      <Text style={styles.title}>Featured Products</Text>
    </View>
  ), [categories, banners]); // Only re-calculate if these change

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={screenWidth / 2 - 16}
            onPress={(product) => navigation.navigate('ProductDetail', { product })}
            onQuickBuy={(product) => console.log('Quick buy:', product.title)}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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

export default HomeScreen;