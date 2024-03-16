import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { db, auth } from '../utils/firebasecfg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import AIScreen from './AIScreen';

const Tab = createBottomTabNavigator();
export default function Main() {
  async function  logOut() {
    await auth.signOut();
  
    // ...
  
  }
  return (
    <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="AI" component={AIScreen} />
  </Tab.Navigator>
   
  );

}