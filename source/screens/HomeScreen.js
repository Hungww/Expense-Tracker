import React from 'react';
import { Button, View, Text } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View>
      <Button
        title="Go to Chatbot"
        onPress={() => navigation.navigate('Chatbot')}
      />
    </View>
    );
};

export default HomeScreen;