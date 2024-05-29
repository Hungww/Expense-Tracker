import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';



const plans = [
  {
    name: 'Free',
    features: ['Manual expense tracking', 'Basic reporting', 'Limited categories'],
    price: 0
  },
  {
    name: 'Premium',
    features: ['Automatic expense tracking', 'Advanced reporting', 'Unlimited categories', 'Income tracking'],
    price: 10
  },
  {
    name: 'Business',
    features: ['Premium features', 'Business expense tracking', 'Accounting software integration', 'Employee expense management'],
    price: 30
  }
];

const currentPlan = plans[1];

function renderPlan(plan, index) {
    return (
      <View key={index} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 30, padding: 20,borderColor: 'gray',borderWidth: 2 , height: 350 }}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>{plan.name}</Text>

        <Text style={{ fontSize: 20, marginBottom: 20 }}>${plan.price}/month</Text>

        <View style={{ marginBottom: 20 }}>
            {plan.name === currentPlan.name ? (
            <Button title="Your Current Plan" disabled />
            ) : (
            <Button title="Subscribe" style={{ backgroundColor: '#00A86B' }} onPress={() => handleSubscribe(plan)}  />
            )}
        </View>
        
        <View style={{ marginBottom: 20 ,flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft:-10 }}>Features:</Text>
            {plan.features.map((feature, index) => (
            <Text key={index}>• {feature}</Text>
            ))}
        </View>
      </View>
    );
  }

const handleSubscribe = (plan) => {
    console.log('Subscribed to:', plan.name);
}

const Subscription = ({ navigation }) => {

  return (
    <View className=" bg-white h-full">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal:20, paddingVertical:15 , backgroundColor:'#00A86B' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ color:'white', fontWeight: '600', fontSize:20 }}>Subscription</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text>Your current plan is: {plans[1].name}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Swiper loop={false} style={{ height: 350, marginTop: 20}}
        paginationStyle={{ bottom: 'auto'}} dotStyle={{ borderRadius: 5, marginVertical: 10, marginHorizontal: 5}}
        >
        {plans.map(renderPlan)}
        </Swiper>
        </View>
    </View>
    
  );
};

export default Subscription;