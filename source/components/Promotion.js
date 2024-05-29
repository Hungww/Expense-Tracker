import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window')-10;

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios.get('https://expense-tracker-server-xi.vercel.app/api/v1/promotions/')
      .then(response => {
        setPromotions(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>Promotion</Text>

      <Swiper showsButtons={false} autoplay={false} loop={false} showsPagination={false} style={{ height: 170 }} 
      >
        {promotions.map((promotion, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(promotion.link)}>
            <Image source={{ uri: promotion.img }} style={{ width: width, borderRadius: 8, height: 163, marginBottom: 8 }} />
          </TouchableOpacity>
        ))}
      </Swiper>

      <View style={{ height: 1, backgroundColor: '#E5E7EB', marginTop: 16 }} />
    </View>
  );
};

export default Promotions;