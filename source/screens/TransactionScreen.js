import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconHeading from "../components/IconHeading";
import ChartComponent from "../components/ChartComponent";
import TransactionComponent from "../components/TransactionComponent";

const TransactionScreen = () => {
    return (
        <SafeAreaView className="px-3.5 bg-white h-full">
            <IconHeading />
            <View>
                <Text className="font-roboto-bold text-[#828282] text-lg">Total Spending</Text>
                <Text className="font-roboto-medium text-2xl">$152</Text>
            </View>
            <ChartComponent />
            <View className="flex-row items-center justify-between">
                <Text className="text-black text-xl font-semibold">Recent Transaction</Text>
                <TouchableOpacity className="px-3 py-2 bg-[#E5F6F0] rounded-2xl" onPress={() => {}}>
                    <Text className="text-[#19B079]">See all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TransactionComponent date="Today"/>
                <TransactionComponent date="4/28/2024"/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TransactionScreen;
