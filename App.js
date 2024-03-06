import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importing the screens
import OnBoardScreen from './source/screens/OnBoardScreen';
import InsideScreen from './source/screens/InsideScreen';


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
        <Stack.Screen name="Inside" component={InsideScreen}  />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );

}