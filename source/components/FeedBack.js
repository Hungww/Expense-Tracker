import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Feedback = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <View className="flex-1 bg-white">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal:20, paddingVertical:15 , backgroundColor:'#00A86B' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ color:'white', fontWeight: '600', fontSize:20 }}>Feedback</Text>
        </View>
        <View className="px-4 py-6">
            <View className="bg-gray-100 rounded-md p-2 mb-6">
                <TextInput
                placeholder="Write your feedback"
                value={feedback}
                onChangeText={handleFeedbackChange}
                multiline
                className="p-2 rounded-md bg-white"
                />
            </View>
            <View className="bg-gray-100 rounded-md p-2 mb-4">
                <Text className="text-gray-600">
                    Please provide your feedback to help us improve our product quality
                </Text>
            </View>
                <TouchableOpacity
                    onPress={handleSubmitFeedback}
                    className="bg-primary rounded-md p-3 mt-4"
                >
                    <Text className="text-white text-center font-bold">Send feedback</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};

export default Feedback;