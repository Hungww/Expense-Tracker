import React, { useContext } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { db, auth } from '../utils/firebasecfg';
import { signOut } from "firebase/auth";
import { userContext } from '../contexts/UserProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AccountScreen = () => {
    const navigation = useNavigation();
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
        <View style={{ flex: 1, backgroundColor: '#F4F4F4', gap: 10 }}>
            <View>
              <TouchableOpacity 
              onPress={() => navigation.navigate('Profile')}
              style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 20, backgroundColor: '#FFF',marginTop: 10 }}
              >
                <Image 
                source={{ uri: user_info?.icon ? user_info.icon : `https://ui-avatars.com/api/?name=${user_info?.name}&background=random&size=56`}}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
                />
                <View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user_info?.name}</Text>
                  <Text style={{ fontSize: 14, color: '#888' }}>View profile</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, backgroundColor: '#FFF' }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, backgroundColor: '#FFF' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="info" size={24} color="#000" style={{ marginRight: 15 }} />
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Account Information</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, backgroundColor: '#FFF' }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="lock" size={24} color="#000" style={{ marginRight: 15 }} />
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Change Password</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, backgroundColor: '#FFF' }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 }} onPress={handlelogout}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="logout" size={24} color="#000" style={{ marginRight: 15 }} />
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Logout</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#888" />
              </TouchableOpacity>
            </View>
        </View>
    );
};

export default AccountScreen;