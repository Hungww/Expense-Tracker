import * as React from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Feather from 'react-native-vector-icons/Feather';
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';





const Stack = createNativeStackNavigator();
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [borderColor, setBorderColor] = useState('border-gray-200');
  const [borderColorPassword, setBorderColorPassword] = useState('border-gray-200');
  const [showPassword, setShowPassword] = useState(true);

  

    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios'? 'padding': 'height'}
      className='flex-1 items-center justify-center' 
    >
      <View className=' flex-1 items-center justify-center' >
        <View style={{ width: 153, height: 153, backgroundColor: '#2fb785', borderRadius: 100, alignItems: 'center', justifyContent: 'center',paddingRight: 2, marginBottom:30, marginTop: -50 }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <Text className=" text-3xl font-medium">Sign in your account</Text>

        <View style={styles.input_container}>
          <Text className=" font-roboto color-[#6F6F6F] text-[16px]  mb-1">Email</Text>
          <View className = {'flex-row items-center justify-center w-80  bg-white pr-2 rounded-xl border-2 ' + borderColor} >
            <TextInput
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="ex: jon.smith@email.com"
              style={styles.input}
              onFocus={() => setBorderColor('border-primary')}
              onBlur={() => setBorderColor('border-gray-200')}
            />
          </View>
        </View>

        <View style={styles.input_container}>
            <Text className=" font-roboto color-[#6F6F6F] text-[16px]  mb-1">Password</Text>
            <View className={'flex-row items-center justify-center w-80  bg-white pr-2 rounded-xl  border-2  ' + borderColorPassword}>
              <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={showPassword}
                placeholder="Your password here..."
                style={styles.input}
                onFocus={() => setBorderColorPassword('border-primary')}
                onBlur={() => setBorderColorPassword('border-gray-200')}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length <1 ? null:  (showPassword ?
                  <Feather name='eye' size={18}/>
                  :<Feather name='eye-off' size={18}/>)
                }
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
            onPress={loginWithEmailPassword} 
            className=' bg-primary  h-14 items-center justify-center rounded-2xl w-80 mt-4'
          >
            <Text className='color-[#fcfcfc] font-roboto font-semibold text-lg'>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={loginWithEmailPassword} 
            className='items-center justify-center mt-5'
          >
            <Text className='color-primary font-roboto font-bold text-lg'>Forgot Password?</Text>
          </TouchableOpacity>

          <View className='items-center flex-row mt-5'>
            <Text className='text-base font-roboto color-[#91919f]'>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text 
                className='text-base font-roboto color-primary'
                onPress={() =>
                  navigation.replace("Inside", { screen: "SignUp" })
                }
              > Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );




    async function loginWithEmailPassword() {
      
      //genarate random email and password
      const sign_email = email;
      const sign_password = password;
      signInWithEmailAndPassword(auth, sign_email, sign_password)
      .then((userCredential) => {
        // Logged in
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

  const styles = StyleSheet.create({
    input: {
      flex: 1,
      height: 40,
      backgroundColor: "white",
      borderRadius: 16,
      paddingHorizontal: 20,
      //marginHorizontal: 2,
      marginVertical: 3,
    },
    input_container: {
      width: '90%',
      marginVertical: 8,
    }
  });


