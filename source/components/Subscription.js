import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { userContext } from '../contexts/UserProvider';
import { get, set } from 'firebase/database';

const Subscription = ({ navigation }) => {
  const { user_info, getUserInfo, user_uid } = useContext(userContext);
  const [plans1, setPlans1] = useState([]);
  const [currentPlan1, setCurrentPlan1] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        setLoading(true);
        const response = await axios.get('http://expense-tracker-server-xi.vercel.app/api/v1/subscription/');
        console.log(response.data);
        setPlans1(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
      finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        console.log("User Info: ", user_info.subscription);
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
  
    fetchSubscription();
  }, [user_info.subscription]);
  
  function renderPlan(plan, index) {
      return (
        <View key={index} style={{ padding: 10 }}>
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 30,borderColor: 'gray',borderWidth: 2 , height: 380, paddingHorizontal: 10, paddingVertical:20 }}>
            <Text style={{ fontSize: 30, marginBottom: 20 }}>{plan.name}</Text>
    
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={{ fontSize: 30, marginBottom: 20 }}>${plan.price}</Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>/month</Text>
            </View>
    
            <View style={{ marginBottom: 20, width: 200 }}>
                {plan.name === currentPlan1?.name ? (
                <Button title="Your Current Plan" disabled/>
                ) : (
                <Button title="Subscribe" color='#00A86B'
                onPress={() => handleSubscribe(plan.id)}/>
                )}
            </View>
            
            <View style={{ marginBottom: 20 ,flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: '80%' }}>
                <Text style={{ fontSize: 20, marginBottom: 10, marginLeft:-10 }}>Features:</Text>
                {plan?.features?.map((feature, index) => (
                <Text key={index}>• {feature}</Text>
                ))}
            </View>
          </View>
        </View>
      );
    }
  async function getSubscriptionRef(id) {
    try {
      const response = await axios.get(`http://expense-tracker-server-xi.vercel.app/api/v1/subscription/ref/${id}`);
      console.log("Current Plan: ", response.data);
      return response.data;
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  async function handleSubscribe(planid) {
    try {
      setLoading(true);
      const subscription = await getSubscriptionRef(planid);
      const response = await axios.put(`http://expense-tracker-server-xi.vercel.app/api/v1/user/update_user/${user_uid}`, {
        ...user_info,
        subscription: subscription,
      });
      console.log("updated user: ", response.data);
      getUserInfo();
    }
    catch (error) {
      console.error('Error:', error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  }
  

  return (
    <View className=" bg-white h-full">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal:20, paddingVertical:15 , backgroundColor:'#00A86B' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ color:'white', fontWeight: '600', fontSize:20 }}>Subscription</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', padding: 20, marginBottom: -30 }}>
            <Text style={{ fontSize: 18 }}>
              Your current plan is: 
            </Text>
            <Text style={{ fontSize: 24, fontWeight:500 }}> {currentPlan1?.name}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          {plans1 && plans1.length > 0 &&
            <Swiper loop={false} style={{ height: 400, marginTop: 20 }}
            dotStyle={{ borderRadius: 5, marginVertical: 10, marginHorizontal: 5}}
            activeDotStyle={{ borderRadius: 5, marginVertical: 10, marginHorizontal: 5, backgroundColor: '#00A86B'}}
        >
            {plans1.map((plan, index) => (renderPlan(plan, index)))}
            </Swiper>
          }
        </View>
        <Modal transparent={true} visible={loading}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <ActivityIndicator size={100} color="#00A86B" />
          </View>
        </Modal>
    </View>
    
  );
};

export default Subscription;