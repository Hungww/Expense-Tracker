import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { userContext } from '../contexts/UserProvider';
import axios from 'axios';

const Avatar = () => {
  const { user_info } = useContext(userContext);
  return (
    <View style={{ backgroundColor: '#828282', borderRadius: 9999, width: 56, height: 56, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: user_info?.icon ? user_info.icon : `https://ui-avatars.com/api/?name=${user_info?.name}&background=random&size=56`
      }} style={{ width: 56, height: 56, borderRadius: 9999 }} />
    </View>
  );
};

const Greeting = () => {

  const { user_info } = useContext(userContext);
  const [currentPlan1, setCurrentPlan1] = useState(null);
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        console.log("User Info: ", user_info?.subscription);
        const sub = user_info.subscription._key.path.segments;
        const id = sub[sub.length - 1];
        const response = await axios.get(`http://expense-tracker-server-xi.vercel.app/api/v1/subscription/${id}`);
        //console.log("User Info: ", user_info.subscription);
        // const response = await axios.post(`http://192.168.1.4:3000/api/v1/subscription/from_ref`, {
        //   ref: user_info.subscription
        // });
        console.log("Current Plan: ", response.data);
        setCurrentPlan1(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
  
    {user_info?.subscription && fetchSubscription()};
  }, [user_info?.subscription]);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
      <View>
        <Text style={{ color: '#828282', fontSize: 16 }}>Hello,</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Hi {user_info?.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>Current Plan:</Text>
          <Text style={{ fontSize: 16, fontWeight:"600" }}> {currentPlan1?.name}</Text>
          <View style={{ padding: 2 }}>
            <Text style={{ fontSize: 14, color: 'white' }}>
              {currentPlan1?.name === 'Free' ? '🎈' : currentPlan1?.name === 'Premium' ? '👑' : currentPlan1?.name === 'Business' ? '💼' : ''}
            </Text>
          </View>
        </View>
      </View>
      <Avatar />
    </View>
  );
};

export default Greeting;