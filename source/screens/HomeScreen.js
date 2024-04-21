import React from 'react';
import { Button, View, Text } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View>
      <Button
        title="Go to Chatbox"
        onPress={() => navigation.navigate('Chatbox')}
      />
    </View>
    );
};

export default HomeScreen;