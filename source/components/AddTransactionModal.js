import React, { useState, useRef } from 'react';
import Modal from 'react-native-modal';
import ModalDropdown from './ModalDropdown';
import CatergoryContainer from './CatergoryContainer';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { 
    Text, 
    View, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard,
    Pressable
} from 'react-native';
import AddCategoryModal from './AddCategoryModal';

const AddTransactionModal = ( {isVisible, onClose} ) => {
    const [typeValue, setTypeValue] = useState("expense");
    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState("");
    const [datePicked, setDatePicked] = useState("");
    const [category, setCategory] = useState("");

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [showAddCategory, setShowAddCategory] = useState(false);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    }

    const toggleAddCategory = () => {
        setShowAddCategory(true);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if(Platform.OS === "ios") {
                togglePicker();
                setDatePicked(currentDate.toDateString());
            }
        } 
        else {
            togglePicker();
        }
    };

    return (
        <>
            <View className="">
                <Modal 
                    className="justify-end m-0" 
                    isVisible={isVisible} 
                    propagateSwipe={true}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: "flex-end"}}>
                            <View className="bg-white p-5 rounded-t-2xl h-[90%] flex-col justify-between">
                                <View>
                                    <View className="flex-row items-center justify-between">
                                        <Text className="text-black text-xl font-semibold">Add Transactions</Text>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Feather name="camera" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                    <View className="mt-2 flex flex-row justify-between">
                                        <View className="w-[60%]">
                                            <Text className="text-black text-lg font-medium mb-2.5">Title</Text>
                                            <TextInput className="px-4 py-2.5 border border-black rounded-md" value={title} onChangeText={(text) => {setTitle(text)}} placeholder='Choose your title'/>
                                        </View>

                                        <View className="w-[35%]">
                                            <Text className="text-black text-lg font-medium mb-2.5">Type</Text>
                                            <ModalDropdown value={typeValue} setValue={setTypeValue} />
                                        </View>
                                    </View>

                                    <View className="mt-2 flex flex-row justify-between">
                                        <View className="w-[25%]">
                                            <Text className="text-black text-lg font-medium mb-2.5">Value</Text>
                                            <View className="border border-black rounded-md flex-row items-center px-4 py-2.5">
                                                <Text>$</Text>
                                                <TextInput
                                                    value={value}
                                                    onChangeText={(text) => setValue(text)}
                                                    className="w-full ml-1"
                                                    keyboardType="numeric"
                                                    placeholder='0,00'
                                                />
                                            </View>
                                        </View>

                                        <View className="w-[70%]">
                                            <Text className="text-black text-lg font-medium mb-2.5">Date</Text>
                                            
                                            {showPicker && (
                                                <DateTimePicker
                                                    mode='date'
                                                    display='spinner'
                                                    value={date}
                                                    onChange={onChange}
                                                    style={{
                                                        height: 120,
                                                        position: 'absolute',
                                                        right: 0,
                                                        left: 0,
                                                        top: -6,
                                                        zIndex: 1,
                                                    }}
                                                    maximumDate={new Date()}
                                                    minimumDate={new Date(2021, 0, 1)}
                                                />
                                            )}

                                            {!showPicker && (
                                                <Pressable
                                                    onPress={togglePicker}
                                                >
                                                    <View className="border border-black rounded-md flex-row items-center px-4 py-2.5">
                                                        <Fontisto name="date" size={16} color="black" />
                                                        <TextInput 
                                                            className="w-full ml-1"
                                                            value={datePicked}
                                                            onChangeText={(text) => setDatePicked(text)}
                                                            placeholder='Choose the date'
                                                            editable={false}
                                                            onPressIn={togglePicker}
                                                        />
                                                    </View>
                                                </Pressable>
                                            )}
                                        </View>
                                    </View>
                                                
                                    <View className="mt-2">
                                        <Text className="text-black text-lg font-medium mb-2.5">Description</Text>
                                        <TextInput 
                                            className="px-4 py-2.5 border border-black rounded-md h-20" 
                                            value={description}
                                            onChange={(text) => setDescription(text)}
                                            multiline={true}
                                            scrollEnabled={true}
                                            placeholder='Write your description here'
                                        />
                                    </View>

                                    <View className="mt-2">
                                        <View className="flex-row items-center mb-2.5 justify-between">
                                            <Text className="text-black text-lg font-medium">Category</Text>
                                            <TouchableOpacity 
                                                className="flex-row items-center bg-[#00A86B] px-2 rounded-lg"
                                                onPress={toggleAddCategory}
                                            >
                                                <AntDesign name="plus" color="white" />
                                                <Text className="text-white text-lg font-medium ml-2">ADD</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <CatergoryContainer category={category} setCategory={setCategory} />
                                    </View>
                                </View>

                                <View className="flex-row justify-between">
                                    <TouchableOpacity className="bg-[#FF8080] py-3 rounded-lg mt-5 w-[45%]" onPress={() => onClose(false)}>
                                        <Text className="text-white text-lg font-medium text-center">Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="bg-[#19B079] py-3 rounded-lg mt-5 w-[45%]">
                                        <Text className="text-white text-lg font-medium text-center">Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                    <AddCategoryModal isVisible={showAddCategory} onClose={setShowAddCategory} />
                </Modal>
            </View>

        </>
    )
}

export default AddTransactionModal;