import React from "react";
import { View, ScrollView } from "react-native";
import CatergoryItem from "./CatergoryItem";

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
        title: "ABC",
        color: "#fd3c4a",
        name: "spoon"
    }, 
    {
        title: "XYZ",
        color: "#FCAC12",
        name: "shopping-bag",
    },
];

const CatergoryContainer = ({ category, setCategory }) => {
    return (
        <ScrollView 
            style={{height: 190, backgroundColor: "white"}}
        >
            <View className="flex-row flex-wrap" >
                {userCategory.map((item, index) => (
                    <CatergoryItem 
                        key={index} 
                        title={item.title} 
                        color={item.color} 
                        name={item.name} 
                        category={category}
                        setCategory={setCategory}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

export default CatergoryContainer;