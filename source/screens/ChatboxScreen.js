import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, Bubble, Composer,InputToolbar,Send, Message  } from 'react-native-gifted-chat';
//paper-plane
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const ChatboxScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [isAIResponding, setIsAIResponding] = useState(false);
    const renderChatEmpty = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',transform: [{ scaleY: -1 },{ scaleX: -1 }]}}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>How can I help you with?</Text>
            <TouchableOpacity style={{ padding: 10, borderRadius: 10, borderWidth: 1, }}>
                <Text style={{ color: '#776F69' }}>What's the best way to track my expenses?</Text>
            </TouchableOpacity>
        </View>
      );
  
    const onSend = newMessages => {
      setMessages(GiftedChat.append(messages, newMessages));
      setIsAIResponding(true);
      setTimeout(() => {
        const aiMessage = {
          _id: Math.random(),
          text: 'Hello! This is an AI response.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'AI',
          },
        };
    
        setMessages(previousMessages => GiftedChat.append(previousMessages, aiMessage));
        setIsAIResponding(false);
      }, 1000);
    };
    const renderBubble = props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
              },
              left: {
                backgroundColor: 'green',
              },
            }}
            textStyle={{
                right: {
                  color: 'white',
                },
                left: {
                  color: 'white',
                },
              }}
          />
        );
      };

      const renderComposer = props => (
        <Composer {...props} textInputProps={{ 
            editable: !isAIResponding,
            maxLength: 100,
            placeholder:"Ask me anything...",
            placeholderTextColor: '#323130',
            style: {
                paddingHorizontal: 20,
                marginTop: 16,
                marginBottom: 20,
                marginLeft: 15,
                marginRight: 10,
                width: 270,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                color: 'black',
                backgroundColor: '#CFFAEA',
              },
        }} />
      );
      const renderInputToolbar = props => (
        <InputToolbar
        {...props}
        containerStyle={{
        backgroundColor: '#CFFAEA',
        }}
            primaryStyle={{ alignItems: 'center' }}
        />
      );

      const renderSend = props => (
        <Send {...props}>
            <View style={{
                marginRight: 10,
                backgroundColor: '#2AB784',
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <SimpleLineIcons name='paper-plane' size={20} color='white'/>
            </View>
        </Send>
      );
      const renderChatFooter = () => (
        <View style={{ marginTop: 34, alignItems: 'center', backgroundColor: 'transparent' }}>
        </View>
      );
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Go back to Home"
          onPress={() => navigation.goBack()}
        />
        <GiftedChat
          messages={messages}
          alwaysShowSend = {true}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: 1,
          }}
          contentContainerStyle={{ padding: 50 }}
          renderBubble={renderBubble}
          renderComposer={renderComposer}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          renderChatFooter={renderChatFooter}
          renderChatEmpty={renderChatEmpty}
        />
      </View>
    );
  };

export default ChatboxScreen;