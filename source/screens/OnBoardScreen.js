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


const data = [
  {
    title: 'Intelligent\nmanagement',
    text: 'Easily manage your personal expenses.',
    image: require('../../assets/piggy.json'),
    bg: 'white',
  },
  {
    title: 'Powerful AI',
    text: 'Effectively optimize your daily\n expense with our powerful AI',
    image: require('../../assets/robot.json'),
    bg: 'white',
  },
  {
    title: 'Large community',
    text: "Be part of our community\nShare your experiences and idea with others",
    image:require('../../assets/comm.json'),
    bg: 'white',
  },
];

const styles = StyleSheet.create({
  //tailwind for dot
  //className="w-8 h-8 rounded-5  mx-2"
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },


  //tailwind for button
  //className="flex-1 items-center w-96 bg-red py-5 rounded-2xl"

  //tailwind for buttonText :
  //
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },

});

export default function OnBoardScreen() {
  slider = undefined;

  _renderItem = ({item}) => {
    return (
      <View
className="flex-1 items-center bg-blue pt-20">
        {/* <Image source={item.image} style={styles.image} /> */}
        <LottieView style={{width: 310, height: 310}} source={item.image} autoPlay loop />
        <Text className="text-onboard_title_color text-center text-4xl font-bold mb-1">{item.title}</Text>
        <Text className=" text-onboard_description_color text-center text-base">{item.text}</Text>
      </View>
    );
  };

  _keyExtractor = (item) => item.title;

  _renderPagination = (activeIndex) => {
    return (
      <View className="absolute bottom-4 left-4 right-4">
        <SafeAreaView>
          <View className="h-4 m-4 flex-row justify-center items-center mb-8">
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  className=" w-2 h-2 rounded-lg mx-2"
                  key={i}
                  style={[
  
                    i === activeIndex
                      ? {backgroundColor: '#7F3DFF', width: 16, height: 16, borderRadius: 8}
                      : {backgroundColor: 'rgba(0, 0, 0, .2)'},
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          <View className="flex-col items-center justify-center">
            <TouchableOpacity
              className="flex-1 items-center py-5 rounded-2xl bg-primary my-1"
              style={[ {width: '96%'}]}
              >
                <Text className=" text-FCFCFC font-bold text-center">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-1 items-center py-5 rounded-2xl bg-third w-11/12 my-1"
              style={[ {width: '96%'}]}
            >
              <Text className=" text-7F3DFF font-bold text-center">Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderPagination={this._renderPagination}
          data={data}
          ref={(ref) => (this.slider = ref)}
        />
      </View>
    );

}