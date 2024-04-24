import React, { useState, useEffect } from 'react';

import { View, TextInput, Button, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, Bubble, Composer,InputToolbar ,Send, Message, Time  } from 'react-native-gifted-chat';
//paper-plane
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import logo from '../../assets/bot_logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { runChat } from '../utils/ai';



const ChatboxScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [dots, setDots] = useState('.');
    const [isAIResponding, setIsAIResponding] = useState(false);
    const renewChat = () => {
      setMessages([]);
    };
    const onSuggestionPress = () => {
    const newMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: "What's the best way to track my expenses?",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
          // And other user properties
        },
      };

      onSend([newMessage]);
    };

    useEffect(() => {
      const intervalId = setInterval(() => {
        setDots(prevDots => {
          return prevDots.length < 3 ? prevDots + '.' : '.';
        });
      }, 500);
    
      return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const getResponse = async (message) => {
      const response = await runChat(message);
      return response;
    };
    const onSend = newMessages => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
      setIsAIResponding(true);
      // const userMessage = newMessages[0].text;
      // getResponse(userMessage).then(aiResponse => {
      //   let cleanedAiResponse = aiResponse.trim();
      //   const aiMessage = {
      //     _id: Math.random(1000000),
      //     text: cleanedAiResponse,
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'AI',
      //       avatar: logo
      //     },
      //   };
      //   console.log(aiMessage);
      //   setMessages(previousMessages => GiftedChat.append(previousMessages, aiMessage));
      //   setIsAIResponding(false);
      // });

      setTimeout(() => {
        const aiMessage = {
          _id: Math.random(1000000),
          text: 'Hello! This is an AI response.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'AI',
            avatar: logo
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, aiMessage));
        
        setIsAIResponding(false);
      }, 3000);
    
    };
    const renderChatEmpty = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',transform: [{ scaleY: -1 },{ scaleX: -1 }]}}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>How can I help you with?</Text>
            <TouchableOpacity style={{ padding: 10, borderRadius: 10, borderWidth: 1, }} onPress={onSuggestionPress}>
                <Text style={{ color: '#776F69' }}>What's the best way to track my expenses?</Text>
            </TouchableOpacity>
        </View>
      );
    
    const renderBubble = props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#2AB784',
              },
              left: {
                backgroundColor: '#e6e6e6',
              },
            }}
            textStyle={{
                right: {
                  color: 'white',
                },
                left: {
                  color: 'black',
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
      const renderFooter = () => {
        if (isAIResponding) {
          return (
            <View style={{ marginTop: 5, alignItems: 'center', backgroundColor: 'transparent'}}>
              <Text style={{ fontSize: 10, color: '#776F69', fontWeight: 500 }}>AI is responding{dots}</Text>
            </View>
          );
        } else {
          return (
            <View style={{ marginTop: 5, alignItems: 'center', backgroundColor: 'transparent' }}>
            </View>
          );
        }
      };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor:'#00A86B' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={logo} style={{ width: 40, height: 40}} />
            <Text style={{ marginLeft: 10, color:'white', fontWeight: 600, fontSize:20 }}>Money Bot</Text>
          </View>
          <TouchableOpacity onPress={renewChat} style={{ marginLeft: 10 }}>
            <Ionicons name="reload" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
          renderFooter={renderFooter}
        />
      </View>
    );
  };

export default ChatboxScreen;