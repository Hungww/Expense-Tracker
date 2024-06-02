import React, { useState, useEffect } from 'react';

import { View, TextInput, Button, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { GiftedChat, Bubble, Composer,InputToolbar ,Send, Message, Time  } from 'react-native-gifted-chat';
//paper-plane
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import logo from '../../assets/bot_logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { runChat } from '../utils/ai';



const ChatbotScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [dots, setDots] = useState('.');
    const [isAIResponding, setIsAIResponding] = useState(false);
    const [history, setHistory] = useState([
      {
        role: "user",
        parts: [{ text: `About:
        Expense Tracker is a mobile application designed to help users manage personal finances effectively by tracking and managing expenses on a simple and user-friendly interface. with users. Not only that, this application also helps users make smart financial decisions by integrating a community forum where people can share experiences, knowledge and management tips. finance, along with a smart virtual assistant that integrates Gemini to provide useful financial advice to users. It offers various features such as expense tracking, AI assistance, Community Forum, OCR bill scanning.
        Layout:
        The bottom navigation in the Monney app consists of five icons: Home, Transaction, Community forum, Profile and a big plus icon for for adding new transactions or expenses ( This screen allows users to add new transactions. Users can input details such as title, value, date, description, and category for the transaction. and the camera icon , user can press on it to use the ocr bill scanning function and the "+ add" button is for user to add new Category)
        Home Screen:
        On the top is user name and icon, bellow that is the section display the name and balance of current wallet, you can press in this section will go to a new screen that view all wallet and option to add new wallet. Next is the Quick action section : There are four quick action buttons: AI, Upgrade, Feedback, and Setting. Next is the Getting started section, this section have card display on a horizontal scrollview, each card have instruction for getting started with Mooney. Finall in the end is the Promotion section.
        Transaction Screen
        It shows a chart, user can swipe to view other chart
        Below the charts is the transaction list display recent transaction, press "see all" button to view the list in full screen
        Chatbot restriction:
        If user require any function that not appear above tell them that the app is not support that function
        If the user's input is irrelevant, let them know you can't assist
        If asked about topics not covered in the provided information, inform the user that you don't have that information.
        If the user's input is not understood, indicate that you don't understand
        Respond only with the information that you have been provide
        All your reply will be short, in one paragraph and no yapping
        Starting chatbot:
        Your name is Monney Bot, an assistance chat bot in an budgeting app name Monney. Your job as a finance chatbot is to assists users with budgeting, investment decisions, and financial planning. Now wait for input from the user"
        `}],
      },
      {
        role: "model",
        parts: [{ text: "Hello there, I'm Monney Bot. How can I assist you today?"}],
      },
    ]);

    const renewChat = () => {
      setMessages([]);
      setHistory([
        {
          role: "user",
          parts: [{ text: `About:
          Expense Tracker is a mobile application designed to help users manage personal finances effectively by tracking and managing expenses on a simple and user-friendly interface. with users. Not only that, this application also helps users make smart financial decisions by integrating a community forum where people can share experiences, knowledge and management tips. finance, along with a smart virtual assistant that integrates Gemini to provide useful financial advice to users. It offers various features such as expense tracking, AI assistance, Community Forum, OCR bill scanning.
          Layout:
          The bottom navigation in the Monney app consists of five icons: Home, Transaction, Community forum, Profile and a big plus icon for for adding new transactions or expenses ( This screen allows users to add new transactions. Users can input details such as title, value, date, description, and category for the transaction. and the camera icon , user can press on it to use the ocr bill scanning function and the "+ add" button is for user to add new Category)
          Home Screen:
          On the top is user name and icon, bellow that is the section display the name and balance of current wallet, you can press in this section will go to a new screen that view all wallet and option to add new wallet. Next is the Quick action section : There are four quick action buttons: AI, Upgrade, Feedback, and Setting. Next is the Getting started section, this section have card display on a horizontal scrollview, each card have instruction for getting started with Mooney. Finall in the end is the Promotion section.
          Transaction Screen
          It shows a chart, user can swipe to view other chart
          Below the charts is the transaction list display recent transaction, press "see all" button to view the list in full screen
          Chatbot restriction:
          If user require any function that not appear above tell them that the app is not support that function
          If the user's input is irrelevant, let them know you can't assist
          If asked about topics not covered in the provided information, inform the user that you don't have that information.
          If the user's input is not understood, indicate that you don't understand
          Respond only with the information that you have been provide
          All your reply will be short, in one paragraph and no yapping
          Starting chatbot:
          Your name is Monney Bot, an assistance chat bot in an budgeting app name Monney. Your job as a finance chatbot is to assists users with budgeting, investment decisions, and financial planning. Now wait for input from the user"
          `,}],
        },
        {
          role: "model",
          parts: [{ text: "Hello there, I'm Monney Bot. How can I assist you today?"}],
        },
      ]);

    };
    const onSuggestionPress = (suggestion) => {
      setIsAIResponding(true);
      const newMessage = {
          _id: Math.round(Math.random() * 1000000),
          text: suggestion,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'User',
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
    
      return () => clearInterval(intervalId);
    }, []);

    const getResponse = async (message, history) => {
      const response = await runChat(message, history);
      return response;
    };
    const onSend = newMessages => {
      console.log("history", history);
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
      setIsAIResponding(true);
      console.log(newMessages);
      const userMessage = newMessages[0].text;
      getResponse(userMessage,history).then(aiResponse => {
        let cleanedAiResponse = aiResponse.trim();
        const aiMessage = {
          _id: Math.random(1000000),
          text: cleanedAiResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'AI',
            avatar: logo
          },
        };
        console.log(aiMessage);
        setHistory(prevHistory => [...prevHistory, 
          { role: "user", parts: [{ text: userMessage }] },
          { role: "model", parts: [{ text: cleanedAiResponse }] }
        ]);
        setMessages(previousMessages => GiftedChat.append(previousMessages, aiMessage));
        setIsAIResponding(false);
      });

      // setTimeout(() => {
      //   const aiMessage = {
      //     _id: Math.random(1000000),
      //     text: 'Hello! This is an AI response.',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'AI',
      //       avatar: logo
      //     },
      //   };
      //   setMessages(previousMessages => GiftedChat.append(previousMessages, aiMessage));
        
      //   setIsAIResponding(false);
      // }, 3000);
    
    };
    const isIos = Platform.OS === 'ios' ? { transform: [{ scaleY: -1}, {scaleX: 1 }] } : { transform: [{ scaleY: -1}, {scaleX: -1 }] };
    const renderChatEmpty = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', ...isIos }}>
            <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 500 }}>How can I help you my friend? 😊</Text>
            <TouchableOpacity 
              style={{
                marginBottom:10, paddingVertical: 10, paddingHorizontal:20, 
                borderRadius: 30, borderWidth: 1, width :300, height:80, borderColor: 'rgba(119, 111, 105, 0.28)',
                justifyContent:'center', alignContent:'center' 
              }} 
              onPress={() =>onSuggestionPress('What is the best app to track my expenses?')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: '#776F69', fontSize: 20, fontWeight:600 }}>What is</Text>
                <Feather name='arrow-up-right' size={25} color='#776F69' style={{}}/>
              </View>
              <Text style={{ color: '#776F69', fontSize: 14 }}>the best app to track my expenses?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                marginBottom:10, paddingVertical: 10, paddingHorizontal:20, 
                borderRadius: 30, borderWidth: 1, width :300, height:80, borderColor: 'rgba(119, 111, 105, 0.28)', 
                justifyContent:'center', alignContent:'center' 
              }} 
              onPress={() =>onSuggestionPress('How to add transaction by camera')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: '#776F69', fontSize: 20, fontWeight:600 }}>How to</Text>
                <Feather name='arrow-up-right' size={25} color='#776F69' style={{}}/>
              </View>
              <Text style={{ color: '#776F69', fontSize: 14 }}>add transaction by camera</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ 
                paddingVertical: 10, paddingHorizontal:20, 
                borderRadius: 30, borderWidth: 1, width :300, height:80, borderColor: 'rgba(119, 111, 105, 0.28)', 
                justifyContent:'center', alignContent:'center' 
              }} 
              onPress = {() =>onSuggestionPress('Tell me about the Monney budgeting application')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: '#776F69', fontSize: 20, fontWeight:600 }}>Tell me</Text>
                <Feather name='arrow-up-right' size={25} color='#776F69' style={{}}/>
              </View>
              <Text style={{ color: '#776F69', fontSize: 14 }}>about the Monney budgeting application</Text>
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
              width: '80%',
              borderRadius: 25,
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.28)',
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
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
            <View style={{ marginTop: 5, marginBottom:10 , alignItems: 'center', backgroundColor: 'transparent'}}>
              <Text style={{ fontSize: 10, color: '#776F69', fontWeight: 500 }}>AI is responding{dots}</Text>
            </View>
          );
        } else {
          return (
            <View style={{ marginTop: 5, marginBottom:10 , alignItems: 'center', backgroundColor: 'transparent' }}>
            </View>
          );
        }
      };

    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
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

export default ChatbotScreen;