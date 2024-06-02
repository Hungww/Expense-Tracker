import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Greeting from '../components/Greeting';
import WalletCard from '../components/Wallets';
import QuickActions from '../components/QuickAction';
import GettingStartedCard from '../components/GettingStarted';
import Promotions from '../components/Promotion';

const HomeScreen = ({navigation}) => {
    return (
    <ScrollView className="px-3.5 bg-white h-full">
      
      <Greeting />
      <WalletCard navigation={navigation} />
      <QuickActions navigation={navigation} />
      <GettingStartedCard navigation={navigation} />
      <Promotions/>
      
    </ScrollView>
    );
};

export default HomeScreen;