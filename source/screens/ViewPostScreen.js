import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { userContext } from '../contexts/UserProvider';
import { Dimensions } from "react-native";

const ViewPostScreen = ({ route, navigation }) => {
    const  post  = route.params.post  ;
    const { width } = Dimensions.get("window");
    console.log(post.owner.name)

    return (
        <SafeAreaView className=" bg-white">


            <ScrollView className="mx-4" >
            <View className="flex flex-row items-center mb-2">
                <Image
                source={{ uri:`https://ui-avatars.com/api/?name=${post.owner.name}&background=random&size=56` }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
                ></Image>
                <View>
                <Text className="text-lg font-semibold">{post.owner.name}</Text>
                <Text className="text-base text-[#868686] ">
                    {post.createdDate}
                </Text>
                </View>
            </View>
            <Text className=" font-medium text-[32px]  mb-1">{post.title}</Text>
            
            <View className = "w-[70%] h-[4] bg-gray-400 my-4 rounded-lg">

            </View>
            <Text className="  text-[16px] text-gray-500  mb-1">
              {post.description}
            </Text>
            <View className="flex flex-row justify-center w-[100%] ">
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  className="w-[98%] h-[200] rounded-md"
                />
              )}
            </View>

            <Text>
              <RenderHtml contentWidth={width} source={{ html: post.content }} />
            </Text>

          </ScrollView>
        </SafeAreaView>


    );


};

export default ViewPostScreen;

