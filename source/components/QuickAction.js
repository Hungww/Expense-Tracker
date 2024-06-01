import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuickActions = ({navigation}) => {
  const actions = [
    { icon: 'robot', label: 'Ai', route: 'Chatbot' },
    { icon: 'diamond-stone', label: 'Upgrade' , route: 'Subscription' },
    { icon: 'note-edit-outline', label: 'FeedBack' , route: 'Feedback' },
    { icon: 'dots-horizontal', label: 'More' , route: 'Chatbot' },
  ];

  return (
    <View style={{ marginTop: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Quick actions</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {actions.map((action, index) => (
          <TouchableOpacity key={index} style={{ alignItems: 'center' }} onPress={() => navigation.navigate(action.route)}>
            <View style={{ backgroundColor: '#F0F9EB', borderRadius: 9999, padding: 16 }}>
              <Icon name={action.icon} size={24} color="#22C55E" />
            </View>
            <Text style={{ marginTop: 8, color: '#64748B' }}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 1, backgroundColor: '#E5E7EB', marginTop: 16 }} />
    </View>
  );
};

export default QuickActions;