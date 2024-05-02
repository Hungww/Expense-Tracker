import React from "react";
import { View, Text, ScrollView } from "react-native";
import TransactionCard from "./TransactionCard";

const TransactionComponent = ({ date }) => {
    return (
        <View>
            <Text className="text-sm text-[#8D8E8E]">{date}</Text>
            <View className="mx-2">
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
            </View>
        </View>
    )
};

export default TransactionComponent;