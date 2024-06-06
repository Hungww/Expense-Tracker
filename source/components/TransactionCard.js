import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CartIcon from "../../assets/icons/cart.svg";
import { FontAwesome } from '@expo/vector-icons';

function hexToRGBA(hex) {
    let r, g, b;
    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    return `rgba(${+r},${+g},${+b},${0.2})`;
}

var userCategory = [
    {
        title: "Shopping",
        color: "#FCAC12",
        name: "shopping-bag",
    },
    {
        title: "Food",
        color: "#fd3c4a",
        name: "spoon"
    }, 
    {
        title: "Monthly rent payment",
        color: "#00a86b",
        name: "file-text-o"
    },
    {
        title: "Restaurant",
        color: "#fd3c4a",
        name: "spoon"
    }, 
    {
        title: "Others",
        color: "#FCAC12",
        name: "shopping-bag",
    },
];

const TransactionCard = (transaction) => {
    let date = new Date(transaction.transaction.date);
    let formattedDate = date.toISOString().split('T')[0].substring(5);
    let formattedTime = date.toTimeString().split(' ')[0].substring(0, 5);
    let finalDateTime = `${formattedDate} ${formattedTime}`;

    for (let i = 0; i < userCategory.length; i++) {
        if (userCategory[i].title === transaction.transaction.category) {
            transaction.transaction.color = userCategory[i].color;
            transaction.transaction.icon = userCategory[i].name;
            break;
        }
    }

    return (
        <View className="my-1.5 shadow-sm shadow-[#C1C1C1] bg-white h-24 py-3.5 px-4 rounded-3xl flex-row items-center justify-between">
            <View className="flex-row items-center">
                <View 
                    className="w-14 h-14 rounded-2xl items-center justify-center mr-3"
                    style={{backgroundColor: hexToRGBA(transaction.transaction.color)}}
                >
                    <FontAwesome name={transaction.transaction.icon} size={30} color={transaction.transaction.color} />
                </View>
                <View className="h-14 justify-between">
                    <Text className="text-base font-medium">{transaction.transaction.title}</Text>
                    <Text className="text-sm font-medium text-[#91919F]">{transaction.transaction.description}</Text>
                </View>
            </View>

            <View className="h-14 justify-between">
                {
                    transaction.transaction.isExpense? <Text className="text-base font-semibold text-[#FD3C4A]">- {transaction.transaction.value} $</Text> : <Text className="text-base font-semibold text-[#19B079]">{transaction.transaction.value} $</Text>
                }
                <Text className="text-sm font-medium text-[#91919F]">
                    {finalDateTime}
                </Text>
            </View>
        </View>
    )
};

export default TransactionCard;
