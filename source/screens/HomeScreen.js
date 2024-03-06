import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";


function InsideScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Inside Screen</Text>
      <Button title="Add Data" onPress={logOut} />
    </View>
  );

}
function OutsideScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Outside Screen</Text>
      <Button title='Login' onPress={loginWithEmailPassword} />
    </View>
  );

}
const Stack = createNativeStackNavigator();
export default function HomeScreen() {
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
      <Stack.Navigator>
        {user_uid ? (
          <Stack.Screen name="Inside" component={InsideScreen} />
        ) : (
          <Stack.Screen name="Outside" component={OutsideScreen} />
        )}
 
        

      </Stack.Navigator>
    );
  }

async function  logOut() {
  await auth.signOut();

  // ...

}
 async function loginWithEmailPassword() {
  //genarate random email and password
  const email = "test" + Math.random().toString(36).substring(7) + "@gmail.com";
  const password = "test123";
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}
