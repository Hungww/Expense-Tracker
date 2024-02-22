import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import OnBoardScreen from './source/screens/OnBoardScreen';


export default function App() {

    return (
      <OnBoardScreen />
    );

}