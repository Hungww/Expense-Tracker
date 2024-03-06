import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { db, auth } from '../utils/firebasecfg';

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