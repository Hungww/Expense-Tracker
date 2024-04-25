import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Knewave_400Regular } from "@expo-google-fonts/knewave";

const IconHeading = () => {
    const [fontsLoaded] = useFonts({Knewave_400Regular})

    return (
        <TouchableOpacity onPress={() => {}}>
            <View className="flex-row items-center">
                <Image
                    source={require("../../assets/expense_logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.text} className="text-xl text-primary font-knewave">Mooney</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
    },
    text: {
        fontFamily: 'Knewave_400Regular',
    }
});

export default IconHeading;