import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';





const Stack = createNativeStackNavigator();
export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign up</Text>
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        className="w-96 h-12 bg-white rounded-2xl px-5 mx-2 my-5"
        />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
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
      //genarate random email and password
      const sign_email = email;
      const sign_password = password;
      createUserWithEmailAndPassword(auth, sign_email, sign_password)
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
  }



