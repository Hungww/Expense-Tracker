import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconHeading from "../components/IconHeading";

const TransactionScreen = () => {
    return (
        <SafeAreaView className="px-3.5">
            <IconHeading />
            <View>
                <Text className="font-roboto-bold text-[#828282] text-lg">Total Spending</Text>
                <Text className="font-roboto-medium text-2xl">$152</Text>
            </View>
        </SafeAreaView>
    )
}

export default TransactionScreen;