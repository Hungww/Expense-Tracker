import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { db, auth } from '../utils/firebasecfg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import AIScreen from './AIScreen';
import ForumScreen from './ForumScreen';
import AccountScreen from './AccountScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
export default function Main() {
  async function  logOut() {
    await auth.signOut();
  
    // ...
  
  }
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="home" color={color} size={size} />),
        }}/>
      <Tab.Screen 
        name="AI" 
        component={AIScreen} 
        options={{
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="android" color={color} size={size} />),
        }}/>
      <Tab.Screen 
        name="Forum" 
        component={ForumScreen}
        options={{
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="forum" color={color} size={size} />),
        }}/>

      <Tab.Screen 
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="account-circle" color={color} size={size} />),
        }}/> 
    </Tab.Navigator>
   
  );

}