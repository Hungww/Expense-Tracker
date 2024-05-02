import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CartIcon from "../../assets/icons/cart.svg";

const TransactionCard = () => {
    return (
        <View className="my-1.5 shadow-sm shadow-[#C1C1C1] bg-white h-24 py-3.5 px-4 rounded-3xl flex-row items-center justify-between">
            <View className="flex-row items-center">
                <View className="w-14 h-14 bg-[#FCEED4] rounded-2xl items-center justify-center mr-3">
                    <CartIcon width={30} height={30} />
                </View>
                <View className="h-14 justify-between">
                    <Text className="text-base font-medium">Shopping</Text>
                    <Text className="text-sm font-medium text-[#91919F]">Buy some grocery</Text>
                </View>
            </View>

            <View className="h-14 justify-between">
                <Text className="text-base font-semibold text-[#FD3C4A]">- $20</Text>
                <Text className="text-sm font-medium text-[#91919F]">10:00 AM</Text>
            </View>
        </View>
    )
};

export default TransactionCard;