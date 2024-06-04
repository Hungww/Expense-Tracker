import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { db, auth } from '../utils/firebasecfg';
import { signOut } from "firebase/auth";
import { userContext } from '../contexts/UserProvider';

const AccountScreen = () => {
    const { user_info, getUserInfo, user_uid, setUser_uid, logout } = useContext(userContext);
    const handlelogout = async () => {
        try {
          await signOut(auth);
          logout();
        } catch (error) {
          console.error("Error signing out: ", error);
        }
      };
      
    return (
        <View>
            <Text>AccountScreen!</Text>
            <Button title="Logout" onPress={handlelogout} />
        </View>
    );
};

export default AccountScreen;