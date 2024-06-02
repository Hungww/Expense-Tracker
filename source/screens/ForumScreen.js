import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
const avatar = require("../../assets/user.png");
const ForumScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [posts, setPosts] = React.useState([
    {
      id: "1",
      user: {
        username: "John Doe",
        avatar: require("../../assets/user.png"),
      },

      createdAt: "2021-09-04T12:00:00Z",
      content:
        "This is some description for the post, or just the conclusion, intro,.... etc.",
      title:
        "Have a great day with  my amazing client all the way from NewYork",
      tags: "Discussion",
      time: "12:00",
      sum: "This is some description for the post, or just the conclusion, intro,.... etc.",
    },
  ]);
  const Item = ({ item }) => (
    <View className="flex flex-col  items-center justify-center px-6 pb-6 shadow-md mb-1 rounded-2xl bg-white">
      <View className="flex flex-row justify-between w-[100%] ">
        <View className="flex flex-row items-center  ">
          <Image
            source={item.user.avatar}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          ></Image>
          <View className="flex flex-col ml-2 mt-3">
            <Text className="text-lg font-semibold">{item.user.username}</Text>
            <Text className="text-base text-[#868686] ">{item.time}</Text>
          </View>
        </View>
        <TouchableOpacity className="flex flex-row items-center -mt-0">
          <Entypo name="dots-three-horizontal" size={24} color="#868686" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row w-[100%] ">
        <View className=" bg-[#2AB784] flex flex-row justify-center py-[4] px-4  ml-10 rounded-3xl">
          <Text className=" text-sm font-semibold text-white">{item.tags}</Text>
        </View>
      </View>

      <TouchableOpacity className="flex flex-col w-[100%] ">
        <Text className="text-xl font-semibold ">{item.title}</Text>
        <Text className="text-base text-[#868686]">{item.Sum}</Text>
        <View className=" w-[100%] mt-2">
          <Image
            source={require("../../assets/thread.jpg")}
            className="w-[100%] h-[200] mt-2 rounded-2xl"
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  );

  //   async function fecthPostData() {
  //     try {
  //       const posts = await Post.getAll();
  //       setPosts(posts);
  //       console.log("AAAAAAAAAAAA");
  //       console.log(posts[1].Time)
  //       console.log(posts[1].Time.toLocaleString());
  //       //sort posts by time
  //       posts.sort((a, b) => b.Time.getTime() - a.Time.getTime());
  //       setLoading(false);

  //     } catch (e) {
  //       console.error("Error getting documents: ", e);
  //     }
  //   }
  //   const onRefresh = React.useCallback(async () => {
  //     setRefreshing(true);
  //     // setTimeout(() => {
  //     //   setRefreshing(false);
  //     // }, 2000);
  //     await fecthPostData();
  //     setRefreshing(false);
  //   }, []);
  //   useEffect(() => {
  //     fecthPostData();
  //   }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView className="flex flex-col h-screen items-center w-[100%] bg-white">
      <View className="flex flex-col flex-1 mb-[60] items-center -mt-4">
        <FlatList
          // className="bg-red-500"
          data={posts}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            paddingBottom:20,
          }}
          //   refreshControl={
          //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   }
        />
      </View>
      <TouchableOpacity
        className="absolute top-[75%] right-[4%] mr-4 mt-4 bg-[#2AB784] p-4 rounded-full"
        onPress={() => navigation.navigate("CreatePostScreen")}
      >
        <Entypo name="plus" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForumScreen;
