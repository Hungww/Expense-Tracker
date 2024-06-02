import React, { useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from "../screens/HomeScreen";
import TransactionScreen from "../screens/TransactionScreen";
import ForumScreen from "../screens/ForumScreen";
import ProfileScreen from "../screens/AccountScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import Feedback from "../components/FeedBack";
import Subscription from "../components/Subscription";
import AddTransactionModal from "../components/AddTransactionModal";
import IconHeading from "./IconHeading";

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const screenOptions = {
    tabBarShowLabel:false,
    tabBarStyle:{
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 70,
      background: "#fff"
    }
}


const HomeStack = ({ navigation, route }) => {
  const tabHiddenRoutes = ["Chatbot", "Feedback", "Subscription"];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
    else {
      navigation.setOptions({tabBarStyle: {display: 'flex', height: 70}});
    }
}, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} 
      options={{
        header: ()=> <IconHeading />,
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

const BottomNavigation = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen 
                    name="Home" 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <Entypo name="home" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fontSize: 12, color: focused ? "#00A86B": "#484C52"}}>HOME</Text>
                                </View>
                            )
                        }
                    }}
                >
                    {props => <HomeStack {...props} />}
                </Tab.Screen>

                <Tab.Screen 
                    name="Transaction" 
                    component={TransactionScreen} 
                    options={{
                        header: ()=> <IconHeading />,
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <FontAwesome name="file-text" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fontSize: 12, color: focused ? "#00A86B": "#484C52"}}>Transaction</Text>
                                </View>
                            )
                        }
                    }}
                />

                <Tab.Screen
                    name="AddTransaction"
                    component={View}
                    listeners={({navigation})=>({
                        tabPress: event=>{
                            event.preventDefault();
                            toggleModal();
                        },
                    })}
                    options={{
                        header: ()=> <IconHeading />,
                        tabBarIcon: ({focused})=>{
                            return (
                                <View 
                                    style={{
                                        alignItems: "center", 
                                        justifyContent: "center",
                                    }}> 
                                    <AntDesign name="pluscircle" size={50} color="#00A86B" />
                                </View>
                            )
                        }
                    }}
                />

                <Tab.Screen 
                    name="Forum" 
                    component={ForumScreen} 
                    options={{
                        header: ()=> <IconHeading />,
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <FontAwesome name="users" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fontSize: 12, color: focused ? "#00A86B": "#484C52"}}>Community</Text>
                                </View>
                            )
                        }
                    }}
                />

                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        header: ()=> <IconHeading />,
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <FontAwesome name="user" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fontSize: 12, color: focused ? "#00A86B": "#484C52"}}>Profile</Text>
                                </View>
                            )
                        }
                    }}
                />
            </Tab.Navigator>

            <AddTransactionModal isVisible={isModalVisible} onClose={setModalVisible} />
        </>
    );
}

export default BottomNavigation;