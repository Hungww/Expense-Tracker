import React, { useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import LottieView from "lottie-react-native";

const data = [
  {
    title: "Intelligent\nmanagement",
    text: "Easily manage your personal expenses.",
    image: require("../../assets/Savings2.json"),
    key: "1",
    bg: "white",
  },
  {
    title: "Powerful AI",
    text: "Effectively optimize your daily\n expense with our powerful AI",
    image: require("../../assets/AI.json"),
    key: "2",
    bg: "white",
  },
  {
    title: "Large community",
    text: "Be part of our community\nShare your experiences and idea with others",
    image: require("../../assets/community.json"),
    key: "3",
    bg: "white",
  },
];
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

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
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default function OnBoardScreen({ navigation }) {
  slider = undefined;

  _renderItem = ({ item }) => {
    return (
      <View className="flex-1 items-center bg-white pt-20">
        {/* <Image source={item.image} style={styles.image} /> */}
        <LottieView
          style={item.key==="3"?{ width: 400, height: 400, marginTop:-40 }: { width: 310, height: 310, marginBottom: 48}}
          source={item.image}
          autoPlay
          loop
          renderMode="SOFTWARE"
        />
        <Text className="text-onboard_title_color text-center text-4xl font-roboto-black mb-1">
          {item.title}
        </Text>
        <Text className=" text-onboard_description_color text-center text-base font-roboto-medium ">
          {item.text}
        </Text>
      </View>
    );
  };

  _keyExtractor = (item) => item.title;

  _renderPagination = (activeIndex) => {
    return (
      <View className="absolute bottom-4 left-4 right-4 ">
        <SafeAreaView>
          <View
            className={
              activeIndex === data.length - 1
                ? "h-4 m-4 flex-row justify-center items-center "
                : "h-4 m-4 flex-row justify-center items-center mb-8"
            }
          >
            {data.length > 1 &&
              data.map((_, i) => (
                
                  <TouchableOpacity
                  className={activeIndex === data.length - 1?
                    " w-2 h-2 rounded-lg mx-2 opacity-0 ":
                    " w-2 h-2 rounded-lg mx-2 "}
                  key={i}
                  style={[
                    i === activeIndex
                      ? {
                          backgroundColor: "#19B079",
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                        }
                      : { backgroundColor: "rgba(0, 0, 0, .2)" },
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                /> 
                
                
              ))}
          </View>
          {activeIndex === data.length - 1 && (
            <FadeInView className="flex-col items-center justify-center">
              <TouchableOpacity
                className="flex-1 items-center py-5 rounded-2xl bg-primary my-1"
                style={[{ width: "96%" }]}
                onPress={() =>
                  navigation.replace("Inside", { screen: "SignUp" })
                }
              >
                <Text className=" text-FCFCFC font-bold text-center">
                  Sign Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 items-center py-5 rounded-2xl bg-third w-11/12 my-1"
                style={[{ width: "96%" }]}
                onPress={() =>
                  navigation.replace("Inside", { screen: "Login" })
                }
              >
                <Text className=" text-32B988 font-bold text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </FadeInView>
          )}
        </SafeAreaView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
