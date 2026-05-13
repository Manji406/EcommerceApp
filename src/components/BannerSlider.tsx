import React from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

import { Banner } from '../types/banner';

const { width } = Dimensions.get('window');

type BannerProps = {
  data: Banner[];
};

export const BannerSlider: React.FC<BannerProps> = ({ data }) => {

  const renderItem = ({ item }: { item: Banner }) => (
    <View style={styles.bannerContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.bannerImage}
      />

     
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={true}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width,
    alignItems: 'center',
  },

  bannerImage: {
    width: width - 32,
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
    marginTop: 10,
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});