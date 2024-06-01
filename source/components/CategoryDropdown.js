import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

const CategoryDropdown = ( {value, setValue} ) => {
    const data =[
        {label: "Creditcard", value: "creditcard"},
        {label: "Codesquareo", value: "codesquareo"},
        {label: "Book", value: "book"},
        {label: "Barschart", value: "barschart"},
        {label: "Home", value: "home"},
        {label: "Staro", value: "staro"},
        {label: "Picture", value: "picture"},
        {label: "Phone", value: "phone"},
        {label: "Camerao", value: "camerao"},
        {label: "Mobile1", value: "mobile1"},
        {label: "Rest", value: "rest"},
        {label: "Wallet", value: "wallet"},
        {label: "Github", value: "github"},
    ]

    return (
        <Dropdown
            selectedTextStyle={{paddingLeft: 10}}
            placeholderStyle={{paddingLeft: 10}}
            data={data}
            maxHeight={300}
            search
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
            renderLeftIcon={() => (
                <AntDesign color="black" name="Safety" size={20} />
              )}
            renderItem={(item, index) => {
                return (
                    <View className="flex-row items-center px-1">
                        <AntDesign name={item.value} size={24} color="black" />
                        <Text className="ml-2">{item.label}</Text>
                    </View>
                )
            }}
        />
    )
}

export default CategoryDropdown;