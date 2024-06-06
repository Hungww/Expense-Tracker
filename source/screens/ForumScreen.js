import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { userContext } from "../contexts/UserProvider";

import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
const avatar = require("../../assets/user.png");
import { useEffect } from "react";
import { Post } from "../utils/network";
import { useIsFocused } from '@react-navigation/native'
const ForumScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const avatar = require("../../assets/user.png");
  const isFocused = useIsFocused();
  const [posts, setPosts] = React.useState([
    {
      id: "1",
      owner: {
        name: "John Doe",
        avatar: require("../../assets/user.png"),
      },

      createdDate: "2021-09-04T12:00:00Z",
      content:
        "This is some description for the post, or just the conclusion, intro,.... etc.",
      title:
        "Have a great day with  my amazing client all the way from NewYork",
      tags: "Discussion",
      time: "12:00",
      description:
        "This is some description for the post, or just the conclusion, intro,.... etc.",
    },
  ]);
  const Item = ({ item }) => (
    <View className="flex flex-col  items-center justify-center px-6 pb-6 shadow-md mb-1 rounded-2xl bg-white">
      <View className="flex flex-row justify-between w-[100%] ">
        <View className="flex flex-row items-center  ">
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.owner.name}&background=random&size=56`,
            }}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          ></Image>
          <View className="flex flex-col ml-2 mt-3">
            <Text className="text-lg font-semibold">{item.owner.name}</Text>
            <Text className="text-base text-[#868686] ">
              {item.createdDate}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="flex flex-row items-center -mt-0">
          <Entypo name="dots-three-horizontal" size={24} color="#868686" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row w-[100%] ">
        <View className=" bg-[#2AB784] flex flex-row justify-center py-[4] px-4  ml-10 rounded-3xl">
          <Text className=" text-sm font-semibold text-white">Information</Text>
        </View>
      </View>

      <TouchableOpacity
        className="flex flex-col w-[100%] "
        onPress={() => navigation.navigate("ViewPostScreen", { post: item })}
      >
        <Text className="text-xl font-semibold ">{item.title}</Text>
        <Text className="text-base text-[#868686]">{item.description}</Text>
        <View className=" w-[100%] mt-2">
          <Image
            source={{
              uri: item.image,
            }}
            className="w-[100%] h-[200] mt-2 rounded-2xl"
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  );

  function processTime(ISOtime) {
    let date = new Date(ISOtime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    console.log("Date:", date);


    let curDate= new Date();
    let curHours = curDate.getHours();
    let curMinutes = curDate.getMinutes();
    let curDay = curDate.getDate();
    let curMonth = curDate.getMonth();
    let curYear = curDate.getFullYear();

    console.log("CurDate:", curDate);

    if (year === curYear && month === curMonth && day === curDay) {
      if (hours === curHours) {
        if (minutes === curMinutes) {
          return("Just now");
        } else {
          return(curMinutes - minutes + " minutes ago");
        }
      } else {
        return(curHours - hours + " hours ago");
      }
    } else {
      return(curDay - day + " days ago");
    }


  }
  async function fecthPostData() {
    try {
      setLoading(true);
      setPosts([]);
      const ListPosts = await Post.getAll();

      ListPosts.sort(function (a, b) {
        return a.createdDate < b.createdDate
          ? 1
          : a.createdDate > b.createdDate
          ? -1
          : 0;
      });
      processTime(ListPosts[0].createdDate);
      for (let i = 0; i < ListPosts.length; i++) {
        ListPosts[i].createdDate = processTime(ListPosts[i].createdDate);
      }
  

      setPosts(ListPosts);
      // //sort posts by time
      // posts.sort((a, b) => b.Time.getTime() - a.Time.getTime());
      setLoading(false);
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);
    await fecthPostData();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    fecthPostData();
  }, [isFocused]);
  if (loading) {
    return <View className="flex flex-row justify-center items-center h-[100%]">
      <ActivityIndicator size="large" color="#19B079" />
    </View>
  }
  return (
    <SafeAreaView className="flex flex-col h-screen items-center w-[100%] bg-white">
      <View className="flex flex-col flex-1 mb-[60] items-center -mt-4">
        <FlatList
          className=" mb-12"
          data={posts}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.description}
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            paddingBottom: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <TouchableOpacity
        className="absolute top-[70%] right-[4%] mr-4 mt-4 bg-[#2AB784] p-4 rounded-full"
        onPress={() => navigation.navigate("CreatePostScreen")}
      >
        <Entypo name="plus" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForumScreen;
