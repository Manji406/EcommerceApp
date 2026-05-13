import React from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';

import { Categories as CategoryType } from '../types/categories';

const { width } = Dimensions.get('window');
const ITEM_SIZE = 72;

type CategoryProps = {
  data: CategoryType[];
};

export const CategoryTags: React.FC<CategoryProps> = ({ data }) => {
  // Debug: If data is empty, show a small hint (remove this after fixing)
  if (!data || data.length === 0) {
    return <View style={{ padding: 20 }}><Text>No Categories Found</Text></View>;
  }

  const renderItem = ({ item }: { item: CategoryType }) => (
    <View style={styles.categoryContainer}>
      <View style={styles.circleWrapper}>
        <Image
          // ✅ Added a fallback image in case item.url is broken or null
          source={{ uri: item.url || 'https://via.placeholder.com/100' }}
          style={styles.circleImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.name || 'No Name'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        // ✅ Ensure unique keys
        keyExtractor={(item, index) => (item.id || index).toString()}
        contentContainerStyle={styles.listPadding}
        // ✅ Add this to prevent layout collapse
        style={{ flexGrow: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    // ✅ Force a minimum height so it doesn't disappear
    minHeight: 110,
  },
  listPadding: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 20,
    width: ITEM_SIZE + 20,
  },
  circleWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
});

export default CategoryTags;