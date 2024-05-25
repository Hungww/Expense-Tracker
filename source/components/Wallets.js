import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WalletCard = () => {
  return (
    <View style={{padding: 10, marginLeft: 5 }}>
        <View style={{ backgroundColor: '#B18AFF', borderRadius: 15}}>
        <View style={{ backgroundColor: '#2AB784', borderRadius: 15, padding: 20, marginLeft:-10, marginRight:10, marginTop:10, marginBottom:-10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#6366F1', borderRadius: 8, padding: 8, marginRight: 12 }}>
                    <Icon name="credit-card" size={20} color="white" /> 
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Main Wallet</Text>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.45)', marginVertical: 20 }}/>
            <TouchableOpacity className="flex-row items-center justify-between">
                <Text style={{ fontSize: 14, color: 'white' }}>Wallet Balance: <Text style={{ fontWeight: 'bold' }}>$9200</Text></Text>
                <Icon name="chevron-right" size={16} color="white" />
            </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

export default WalletCard;