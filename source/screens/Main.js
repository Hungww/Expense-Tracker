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


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Chatbot"){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }else {
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
    </Stack.Navigator>
  );
};

export default function Main() {
  async function  logOut() {
    await auth.signOut();
  
    // ...
  
  }
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home"
        options={{
          headerShown: false,
          tabBarStyle:{display: 'none'},
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="home" color={color} size={size} />),
        }}>
        {(props) => <HomeStack {...props} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Transaction"
        component={TransactionScreen}
        options={{
          header: () => <IconHeading />,
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="swap-horiz" color={color} size={size} />),
        }}/>
      <Tab.Screen 
        name="Forum" 
        component={ForumScreen}
        options={{
          header: () => <IconHeading />,
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="forum" color={color} size={size} />),
        }}/>

      <Tab.Screen 
        name="Account"
        component={AccountScreen}
        options={{
          header: () => <IconHeading />,
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="account-circle" color={color} size={size} />),
        }}/> 
    </Tab.Navigator>
   
  );

}