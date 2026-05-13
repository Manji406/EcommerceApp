import React from 'react';
import {
  View,
  FlatList,
  ImageBackground, // 1. Import ImageBackground
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
      {/* 2. Use ImageBackground to allow overlaying text */}
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.bannerImage}
        imageStyle={{ borderRadius: 12 }} // Applied to the image itself
      >
        {/* 3. Add a semi-transparent overlay for text readability */}
        <View style={styles.textOverlay}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      // Optional: helps with snapping to center
      snapToInterval={width}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bannerImage: {
    width: width - 32,
    height: 180,
    justifyContent: 'flex-end', // Aligns text to bottom
    overflow: 'hidden',
  },
  textOverlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)', // Dark overlay to make text pop
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
});