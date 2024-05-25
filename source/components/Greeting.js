import React from 'react';
import { View, Text, Image } from 'react-native';

const Avatar = () => {
  return (
    <View style={{ backgroundColor: '#828282', borderRadius: 9999, width: 56, height: 56, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
};

const Greeting = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View>
        <Text style={{ color: '#828282', fontSize: 16 }}>Hello,</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Hi James</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>Premium</Text>
          <View style={{ marginLeft: 10, borderRadius: 9999, padding: 2 }}>
            <Text style={{ fontSize: 14, color: 'white' }}>👑</Text>
          </View>
        </View>
      </View>
      <Avatar />
    </View>
  );
};

export default Greeting;