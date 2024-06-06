import React from "react";
import { View, Text, ScrollView } from "react-native";
import TransactionCard from "./TransactionCard";

const TransactionComponent = ({ data }) => {
    return (
        <View className="pb-20">
            <Text className="text-sm text-[#8D8E8E]"></Text>
            <View className="mx-2">
                {data && data.map((transaction, index) => (
                    <TransactionCard key={index} transaction={transaction} />
                ))}
            </View>
        </View>
    )
};

export default TransactionComponent;
