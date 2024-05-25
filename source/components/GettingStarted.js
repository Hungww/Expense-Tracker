import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const GettingStartedCard = ({navigation}) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>Getting started</Text>

      <View style={{ backgroundColor: '#93C5FD', borderRadius: 8, padding: 20 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Get to our community,
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}> share your tips</Text>
        </Text>
        <Text style={{ color: 'white', marginBottom: 16 }}>Set up goal and learn new things with expert.</Text>

        <TouchableOpacity style={{ backgroundColor: 'white', padding: 12, borderRadius: 6, alignItems: 'center' }} onPress={() => navigation.navigate('Forum')}>
          <Text style={{ color: '#3B82F6', fontWeight: 'bold' }}>ENTER OUR FORUM</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 1, backgroundColor: '#E5E7EB', marginTop: 16 }} />
    </View>
  );
};

export default GettingStartedCard;