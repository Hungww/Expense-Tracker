import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";

//Importing the screens
import HomeScreen from './HomeScreen';
import SignUpScreen from './SignUpScreen';


const Stack = createNativeStackNavigator();

export default function InsideScreen() {
  const [user_uid, setUser_uid] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser_uid(user.uid)
      console.log("User is signed in")
      // ...
    } else {
      // User is signed out
      setUser_uid("")
      console.log("User is signed out")
      // ...
    }
  });
  return (
    <Stack.Navigator      
    screenOptions={{
      headerShown: false
    
    }}>
 
      {user_uid ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      )}

      

    </Stack.Navigator>
  );
}