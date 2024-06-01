import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { db, auth } from '../utils/firebasecfg';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import AIScreen from './AIScreen';
import TransactionScreen from './TransactionScreen';
import ForumScreen from './ForumScreen';
import AccountScreen from './AccountScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconHeading from "../components/IconHeading";
import ChatbotScreen from './ChatbotScreen';
import Feedback from '../components/FeedBack';
import Subscription from '../components/Subscription';
import BottomNavigation from '../components/BottomNavigation';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation, route }) => {
  const tabHiddenRoutes = ["Chatbot", "Feedback", "Subscription"];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
}, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} 
      options={{
        header: () => <IconHeading />,
      }}
      />
      <Stack.Screen 
      name="Chatbot"
      component={ChatbotScreen} 
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="Feedback"
      component={Feedback}
      options={{
        headerShown: false
      }}/>
      <Stack.Screen
      name="Subscription"
      component={Subscription}
      options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
};

export default function Main() {
  async function  logOut() {
    await auth.signOut();
  
    // ...
  
  }
  return (
    <BottomNavigation />
  );

}