import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';





const Stack = createNativeStackNavigator();
export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  

    return (
    <View className=' flex-1 items-center justify-center' >
      <Text className=" font-roboto">Sign up</Text>
      
      <TextInput
        
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        className="w-96 h-12 bg-white rounded-2xl px-5 mx-2 my-5"
        />
      <TextInput
        
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        className="w-96 h-12 bg-white rounded-2xl px-5 mx-2 my-5"
        />
      <Button title="Sign up" onPress={loginWithEmailPassword} />
    </View>
    );




    async function loginWithEmailPassword() {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
      //genarate random email and password
      const sign_email = "luuchanhung123456@gmail.com"
      const sign_password = "123456";
      createUserWithEmailAndPassword(auth, sign_email, sign_password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
    
    }
  }



