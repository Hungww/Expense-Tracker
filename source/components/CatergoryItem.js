import React, { useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { set } from "firebase/database";

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

const CatergoryItem = ({ title, color, name, category, setCategory }) => {
    const selected = category == title;

    function handleSelected() {
        if (category == title) {
            setCategory("");
        }
        else {
            setCategory(title);
        }
    }

    return (
        <TouchableOpacity 
            onPress={handleSelected} 
            className="flex-row items-center rounded-full mr-3 mb-2 px-3 py-2 shadow-sm shadow-zinc-300" 
            style={{backgroundColor: selected ? hexToRGBA('#19B079') : "white"}}
        >
            <View style={{backgroundColor: hexToRGBA(color)}} className="rounded-full h-11 w-11 items-center justify-center">
                <FontAwesome name={name} size={18} color={color} />
            </View>
            <Text className="font-medium ml-2">{title}</Text>
        </TouchableOpacity>
    )
}

export default CatergoryItem;