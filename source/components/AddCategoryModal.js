import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import CategoryDropdown from './CategoryDropdown';

const AddCategoryModal = ({ isVisible, onClose }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [colorSelected, setColorSelected] = useState('');

    const colors = ["#FF8080", "#FFC833", "#33C4FF", "#33FF9D", "#FF33E9", "#FF3366", "#33FFC7", "#FF33C7", "#33FF33", "#FF3333", "#3333FF"]

    return (
        <View className="flex z-10">
            <Modal 
                isVisible={isVisible} 
                onBackdropPress={() => onClose(false)}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: "center"}}>
                    <View className="bg-white p-5 rounded-2xl h-fit">
                        <View>
                            <View className="flex-row items-center justify-between w-full">
                                <Text className="text-black text-xl font-semibold">Add Category</Text>
                                <TouchableOpacity onPress={() => onClose(false)}>
                                    <AntDesign name="closecircleo" size={24} color="#FF8080" />
                                </TouchableOpacity>
                            </View>

                            <View className="mt-2 flex flex-row justify-between">
                                <View className="w-[50%]">
                                    <Text className="text-black text-lg font-medium mb-2.5">Title</Text>
                                    <TextInput className="px-4 py-2.5 border border-black rounded-md" value={title} onChangeText={(text) => {setTitle(text)}} placeholder='Choose your title'/>
                                </View>

                                <View className="w-[45%]">
                                    <Text className="text-black text-lg font-medium mb-2.5">Type</Text>
                                    <CategoryDropdown value={category} setValue={setCategory} />
                                </View>
                            </View>
                        </View>

                        <View className="mt-2">
                            <Text className="text-black text-lg font-medium mb-2.5">Color</Text>
                            <View className="flex flex-row flex-wrap">
                                {colors.map((color, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => setColorSelected(color)} 
                                        className="m-1 w-8 h-8 rounded-full border border-black items-center justify-center"
                                        style={{backgroundColor: color}}
                                    >
                                        {colorSelected === color && <Text className="text-2xl">✓</Text>}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <TouchableOpacity 
                            onPress={() => onClose(false)}
                            className="bg-[#19B079] py-3 rounded-lg mt-5 w-full"
                        >
                            <Text className="text-white text-lg font-medium text-center">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

export default AddCategoryModal;