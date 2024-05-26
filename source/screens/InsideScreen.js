import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { db, auth } from "../utils/firebasecfg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useContext } from "react";
import { userContext } from "../contexts/UserProvider";

//Importing the screens
import Main from "./Main";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import AIScreen from "./AIScreen";
import ChatbotScreen from "./ChatbotScreen";
import { Use } from "react-native-svg";

const Stack = createNativeStackNavigator();
export default function InsideScreen({ route, navigation }) {
  const ScreenName = route.params.screen;
  var ScreenComponent = null;
  if (ScreenName == "SignUp") {
    ScreenComponent = SignUpScreen;
  } else {
    ScreenComponent = LoginScreen;
  }

  const User = useContext(userContext);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      User.setUser_uid(user.uid);
      console.log("User is signed in");
      // ...
    } else {
      // User is signed out
      User.setUser_uid("");
      console.log("User is signed out");
      // ...
    }
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {User.user_uid ? (
        <>
          <Stack.Screen name="Main" component={Main} />
        </>
      ) : (
        <Stack.Screen name={ScreenName} component={ScreenComponent} />
      )}
    </Stack.Navigator>
  );
}
