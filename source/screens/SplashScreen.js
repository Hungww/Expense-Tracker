import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = () => {
  useEffect(() => {
    // Add any necessary logic or API calls here
    // Example: setTimeout(() => { navigateToNextScreen() }, 3000);
    setTimeout(() => {
      //alert error
    }, 5000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#2fb785]">
      <Image
        source={require("../../assets/logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
