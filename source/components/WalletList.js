import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WalletItem = ({ iconName, walletName, balance }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', }}>
      <View style={{ backgroundColor: '#4CAF50', borderRadius: 25, padding: 10, marginRight: 15, }}>
        <Icon name={iconName} size={24} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18 }}>{walletName}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 16 }}>${balance}</Text>
      </View>
    </View>
  );
};

const WalletList = ({ navigation }) => {
  const [wallets, setWallets] = useState([
    { id: 1, iconName: 'credit-card', name: 'Main Wallet', balance: 9200 },
    { id: 2, iconName: 'cc-discover', name: 'Chase', balance: 1000 },
    { id: 3, iconName: 'cc-visa', name: 'Citi', balance: 6000 },
    { id: 4, iconName: 'paypal', name: 'Paypal', balance: 2000 },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white',justifyContent: 'space-between', }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'center', }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ color:'black', fontWeight: 600, fontSize:24 }}>Wallets</Text>
        <View/>
      </View>
      <View style={{ alignItems: 'center',  marginBottom: 20, }}>
        <Text style={{ fontSize: 16, color: 'gray', }}>Total Balance</Text>
        <Text style={{ fontSize: 48, fontWeight: 'bold', }}>$18200</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {wallets.map((wallet) => (
          <WalletItem
            key={wallet.id}
            iconName={wallet.iconName}
            walletName={wallet.name}
            balance={wallet.balance}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={{ backgroundColor: '#4CAF50', padding: 15, alignItems: 'center', margin: 20, borderRadius: 8, }}>
        <Text style={{ color: '#fff',  fontSize: 18, fontWeight: 'bold', }}>+ Add new wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletList;