import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const IconHeading = () => {
    return (
        <TouchableOpacity onPress={() => {}} className="bg-white">
            <View className="flex-row items-center">
                <Image
                    source={require("../../assets/expense_logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.text} className="text-xl text-primary">Mooney</Text>
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