import React, {useEffect, useState, useContext} from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconHeading from "../components/IconHeading";
import ChartComponent from "../components/ChartComponent";
import TransactionComponent from "../components/TransactionComponent";
import axios from "axios";
import { userContext } from "../contexts/UserProvider";

const TransactionScreen = ()  => {
    const {user_uid, user_transactions, get_transactions} = useContext(userContext);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        get_transactions();
    }, []);

    let totalSpending = 0;
    if (user_transactions && user_transactions.length > 0) {
        user_transactions.forEach(transaction => {
            if (transaction.isExpense) {
                totalSpending += parseFloat(transaction.value);
            }
        });
    }

    return (
        <SafeAreaView className="px-3.5 bg-white h-full">
            <View>
                <Text className="font-roboto-bold text-[#828282] text-lg">Total Spending</Text>
                <Text className="font-roboto-medium text-2xl">${totalSpending}</Text>
            </View>
            <ChartComponent />
            <View className="flex-row items-center justify-between">
                <Text className="text-black text-xl font-semibold">Recent Transaction</Text>
                <TouchableOpacity className="px-3 py-2 bg-[#E5F6F0] rounded-2xl" onPress={() => {}}>
                    <Text className="text-[#19B079]">See all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    user_transactions && user_transactions.length > 0 && 
                        <TransactionComponent data={user_transactions} />
                    
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default TransactionScreen;
