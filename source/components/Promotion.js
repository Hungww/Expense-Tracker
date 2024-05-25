import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const promotions = [
  { id: 1, title: 'Promotion 1', image: 'https://via.placeholder.com/150', link: 'https://www.promotion1.com' },
  { id: 2, title: 'Promotion 2', image: 'https://via.placeholder.com/150', link: 'https://www.promotion2.com' },
  // Add more promotions as needed
];

const { width } = Dimensions.get('window')-10;

const Promotions = () => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>Promotion</Text>

      <Swiper showsButtons={false} autoplay={false} loop={false} showsPagination={false} style={{ height: 160 }} >
        {promotions.map((promotion) => (
          <TouchableOpacity key={promotion.id} onPress={() => Linking.openURL(promotion.link)}>
            {/* <View style={{ backgroundColor: '#93C5FD', borderRadius: 8, padding: 20, marginRight: 16 }}>
              <Image source={{ uri: promotion.image }} style={{ width: width, height: 150, marginBottom: 8 }} />
            </View> */}
            <Image source={{ uri: promotion.image }} style={{ width: width, borderRadius: 8, height: 150, marginBottom: 8 }} />
          </TouchableOpacity>
        ))}
      </Swiper>

      <View style={{ height: 1, backgroundColor: '#E5E7EB', marginTop: 16 }} />
    </View>
  );
};

export default Promotions;