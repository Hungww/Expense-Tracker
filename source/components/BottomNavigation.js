import React, { useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../screens/HomeScreen";
import TransactionScreen from "../screens/TransactionScreen";
import ForumScreen from "../screens/ForumScreen";
import ProfileScreen from "../screens/AccountScreen";
import AddTransactionModal from "../components/AddTransactionModal";

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel:false,
    headerShown:false,
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
                    component={HomeScreen} 
                    options={{
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <Entypo name="home" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fonSize: 12, color: focused ? "#00A86B": "#484C52"}}>HOME</Text>
                                </View>
                            )
                        }
                    }}
                />

                <Tab.Screen 
                    name="Transaction" 
                    component={TransactionScreen} 
                    options={{
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <FontAwesome name="file-text" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fonSize: 12, color: focused ? "#00A86B": "#484C52"}}>Transaction</Text>
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
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <FontAwesome name="users" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fonSize: 12, color: focused ? "#00A86B": "#484C52"}}>Community</Text>
                                </View>
                            )
                        }
                    }}
                />

                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <FontAwesome name="user" size={24} color={focused ? "#00A86B": "#484C52"} />
                                    <Text style={{fonSize: 12, color: focused ? "#00A86B": "#484C52"}}>Profile</Text>
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