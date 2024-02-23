import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardScreen from './source/screens/OnBoardScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      
      }}
      >

        <Stack.Screen name="OnBoard" component={OnBoardScreen}  />
        <Stack.Screen name="Home" component={HomeScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );

}