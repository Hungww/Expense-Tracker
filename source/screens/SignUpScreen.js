import * as React from 'react';
import { View, Text, Button, TextInput,SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useState } from "react";
import { db, auth } from '../utils/firebasecfg';
import Feather from 'react-native-vector-icons/Feather';
import Error from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();
export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [re_password, setRePassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  const [nameVerified, setNameVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [rePasswordVerified, setRePasswordVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerified(false);
    if(nameVar.length > 1) {
      setNameVerified(true);
    }
  }

  function handleEmail(e) {
    const emailVal = e.nativeEvent.text;
    setEmail(emailVal);
    setEmailVerified(false);
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setEmail(emailVal);
      setEmailVerified(true);
    }
  }

  function handlePassword(e) {
    const passwordVal = e.nativeEvent.text;
    setPassword(passwordVal);
    setPasswordVerified(false);
    // password contains at least 6 characters, including at least 1 letter and 1 number
    if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(passwordVal)) {
      setPasswordVerified(true);
      setPassword(passwordVal);
    }
  }

  function handleRePassword(e) {
    const rePasswordVal = e.nativeEvent.text;
    setRePassword(rePasswordVal);
    setRePasswordVerified(false);
    if(rePasswordVal === password) {
      setRePasswordVerified(true);
      setRePassword(rePasswordVal);
    }
  }

    return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios'? 'padding': 'height'}
      className='flex-1 items-center justify-center' 
    >
      <Text className="font-roboto font-semibold text-3xl mb-4">Create your account</Text>

      <View className='w-full items-center'>
        <View style={styles.input_container}>
          <Text className="font-roboto text-base">Name</Text>
          <View className='flex-row items-center justify-center border-2 border-white bg-white pr-2 rounded-3xl'>
            <TextInput
              onChange={text => handleName(text)}
              value={name}
              placeholder="ex: John Doe..."
              style={styles.input}
            />
            {name.length <1 ? null:  (nameVerified ?
              <Feather name='check-circle' color='green' size={20}/>
              :<Error name='error' color='red' size={20} />) }
          </View>
          {
            name.length<1?null: (
              nameVerified ? null: 
              <Text className='text-red-500 mt-1'>Name must contain at least 2 characters</Text>
            )
          }
        </View>
        
        <View style={styles.input_container}>
          <Text className="font-roboto text-base">Email</Text>
          <View className='flex-row items-center justify-center border-2 border-white bg-white pr-2 rounded-3xl'>
            <TextInput
              onChange={text => handleEmail(text)}
              value={email}
              placeholder="ex: email@example.com"
              style={styles.input}
            />
            {email.length <1 ? null:  (emailVerified ?
                <Feather name='check-circle' color='green' size={20}/>
                :<Error name='error' color='red' size={20} />) }
          </View>
          {
            email.length<1?null: (
              emailVerified ? null: 
              <Text className='text-red-500 mt-1'>Enter proper email address</Text>
            )
          }
        </View>

        <View style={styles.input_container}>
          <Text className="font-roboto text-base">Password</Text>
          <View className='flex-row items-center justify-center border-2 border-white bg-white pr-2 rounded-3xl'>
            <TextInput
              onChange={text => handlePassword(text)}
              value={password}
              secureTextEntry={showPassword}
              placeholder="Your password here..."
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length <1 ? null:  (showPassword ?
                <Feather name='eye' size={18} color={passwordVerified? 'green': 'red'}/>
                :<Feather name='eye-off' size={18} color={passwordVerified? 'green': 'red'}/>)
              }
            </TouchableOpacity>
          </View>
          {password.length <1 ? null:  (passwordVerified ? null : 
            <Text className='text-red-500 mt-1'>Password must contain at least 6 characters, including at least 1 letter and 1 number</Text>)}
        </View>

        <View style={styles.input_container}>
          <Text className="font-roboto text-base">Confirm password</Text>
          <View className='flex-row items-center justify-center border-2 border-white bg-white pr-2 rounded-3xl'>
            <TextInput
              onChange={text => handleRePassword(text)}
              value={re_password}
              secureTextEntry={showRePassword}
              placeholder="Re-enter your password here..."
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
              {re_password.length <1 ? null:  (showRePassword ?
                <Feather name='eye' size={18} color={rePasswordVerified? 'green': 'red'}/>
                :<Feather name='eye-off' size={18} color={rePasswordVerified? 'green': 'red'}/>)
              }
            </TouchableOpacity>
          </View>
          {re_password.length <1 ? null:  (rePasswordVerified ? null : 
            <Text className='text-red-500 mt-1'>Password does not match.</Text>)}
        </View>

        <View className='items-center justify-center flex-row mt-6 mb-4 mr-5 mx-4'>
          <Checkbox 
            className='border-2 border-[#7F3DFF] rounded-md w-6 h-6 mr-2'
            value={isSelected} 
            onValueChange={setSelection} color={isSelected ? '#7F3DFF' : undefined}
          />

          <Text className='text-sm'>
            By signing up, you agree to the
            <Text className='text-[#7F3DFF]' onPress={()=>{}}> Terms of Service and Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity 
          onPress={loginWithEmailPassword} 
          className='bg-[#7F3DFF] w-[90%] h-14 items-center justify-center rounded-2xl'
        >
          <Text className='color-[#fcfcfc] font-roboto font-semibold text-lg'>Sign Up</Text>
        </TouchableOpacity>

        <View className='items-center flex-row mt-2'>
          <Text className='text-base font-roboto color-[#91919f]'>Already have an account?</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text className='text-base font-roboto color-[#7F3DFF]'> LogIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 20,
    //marginHorizontal: 8,
    marginVertical: 4,
  },
  input_container: {
    width: '90%',
    marginVertical: 10,
  }
});

