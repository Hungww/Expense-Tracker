import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
export default function HomeScreen() {
  async function  logOut() {
    await auth.signOut();
  
    // ...
  
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Add Data" onPress={logOut} />
    </View>
  );

}