import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
//Importing the screens
import OnBoardScreen from './source/screens/OnBoardScreen';
import InsideScreen from './source/screens/InsideScreen';
import SplashScreen from './source/screens/SplashScreen';
import SignUpScreen from './source/screens/SignUpScreen';

import {useFonts} from 'expo-font';
import { Transaction } from 'firebase/firestore';
import TransactionScreen from './source/screens/TransactionScreen';
import { Knewave_400Regular } from '@expo-google-fonts/knewave';

import BottomNavigation from './source/components/BottomNavigation';
const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
    Knewave_400Regular
  });
  if (!fontsLoaded){
    return (
      <SplashScreen/>
      )
  }
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        
        }}
        >
          
          <Stack.Screen name="BottomNavigation" component={BottomNavigation}  />
          <Stack.Screen name="OnBoard" component={OnBoardScreen}  />
          <Stack.Screen name="Inside" component={InsideScreen}  />
          
          
        </Stack.Navigator>
      </NavigationContainer>
      {/* <BottomNavigation/> */}
    </>
  );

}