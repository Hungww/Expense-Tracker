import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { useWindowDimensions } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { userContext } from "../contexts/UserProvider";
import React from "react";
import { Post } from "../utils/network";
import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";
import RenderHtml from "react-native-render-html";

const PAGES = ["Page 1", "Page 2", "Page 3"];

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: "#4aae4f",
  separatorUnFinishedColor: "#a4d4a5",
  stepIndicatorFinishedColor: "#4aae4f",
  stepIndicatorUnFinishedColor: "#a4d4a5",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#666666",
  labelSize: 12,
  currentStepLabelColor: "#4aae4f",
};

const CreatePostScreen = ({ navigation }) => {
  const User = React.useContext(userContext);


  const [currentPage, setCurrentPage] = React.useState(0);
  const [leftColor, setLeftColor] = React.useState("#808080");
  const [leftDisable, setLeftDisable] = React.useState(true);
  const [rightColor, setRightColor] = React.useState("#19B079");
  const [rightDisable, setRightDisable] = React.useState(false);

  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [image_base64, setImage_base64] = React.useState(null);
  const [image_type, setImage_type] = React.useState(null);
  const [tittle, setTittle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { width } = useWindowDimensions();
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });

  const initialContent = "";

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImage_base64(result.assets[0].base64);
      setImage_type(result.assets[0].mimeType);
    }
  };
  function setButton(cur) {
    if (cur === 0) {
      setLeftColor("#808080");
      setLeftDisable(true);
      setRightColor("#19B079");
      setRightDisable(false);
    } else if (cur === 1) {
      setLeftColor("#808080");
      setLeftDisable(true);
      setRightColor("#19B079");
      setRightDisable(false);
    } else if (cur === 2) {
      setLeftColor("#19B079");
      setLeftDisable(false);
      setRightColor("#808080");
      setRightDisable(true);
    }
  }
  function onPressLeft() {
    if (currentPage > 0) {
      setButton(currentPage - 1);

      setCurrentPage((prev) => prev - 1);
      console.log(content);
    }
  }
  async function onPressRight() {
    if (currentPage < 2) {
      if (currentPage === 0) {
        const newcont = await editor.getHTML();
        setContent(newcont);

        //reset the editor
        editor.setContent("");
      }

      setButton(currentPage + 1);
      setCurrentPage((prev) => prev + 1);

      console.log(content);
    }
  }
  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  const renderLabel = ({ position, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    );
  };

  async function onSubmit() {
    const createdDate = new Date().toISOString();
    console.log(createdDate)
    const data = {
      owner: User.user_info,
      tittle: tittle,
      description: description,
      content: content,
      image: image_base64,
      image_type: image_type,
      createdDate: createdDate,
    };
    console.log(data.owner);
    await Post.createPost(data);
    navigation.navigate("Main");
    
  }
  const renderTab = (index) => {
    switch (index) {
      case 0:
        return <View></View>;
      case 1:
        return (
          <View className="flex flex-col justify-center items-center">
            <View>
              <Text className=" font-medium text-[16px]  mb-1">Tittle</Text>
              <View
                className={
                  "flex-row items-center justify-center w-80  bg-white pr-2 rounded-xl border "
                }
              >
                <TextInput
                  onChangeText={(text) => setTittle(text)}
                  value={tittle}
                  placeholder="ex: A new way to manage your money..."
                  style={styles.input}
                />
              </View>
            </View>

            <View className="pt-4">
              <Text className=" font-medium text-[16px]  mb-1">Summary</Text>
              <View
                className={
                  "flex-row items-center justify-center w-80  bg-white pr-2 rounded-xl border "
                }
              >
                <TextInput
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  placeholder="ex: Mooney provides a new way to manage your money,you can track your expenses and income easily"
                  style={styles.input_multilines}
                  multiline={true}
                />
              </View>
            </View>

            <View className="pt-4 w-80">
              <View className="w-[100%] ">
                <Text className=" font-medium text-[16px]  mb-1">
                  Cover Image
                </Text>
              </View>

              <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
              />
              {image && (
                <Image source={{ uri: image }} className="w-80 h-[200]" />
              )}
            </View>
          </View>
        );
      case 2:
        return (
          <ScrollView className="mx-4">
            <Text className=" font-medium text-[32px]  mb-1">{tittle}</Text>
            <Text className="  text-[16px] text-gray-500  mb-1">
              {description}
            </Text>
            <View className="flex flex-row justify-center w-[100%] ">
              {image && (
                <Image
                  source={{ uri: image }}
                  className="w-[98%] h-[200] rounded-md"
                />
              )}
            </View>

            <Text>
              <RenderHtml contentWidth={width} source={{ html: content }} />
            </Text>

            <TouchableOpacity className="w-[100%] flex flex-row justify-center"
              onPress={onSubmit}
            >
              <View className="flex flex-row justify-center items-center w-[80%] bg-primary rounded-md py-4 my-4">
                <Text className="text-white font-medium text-[16px]">
                  Publish
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={firstIndicatorStyles}
          currentPosition={currentPage}
          labels={["Create content", "Add option", "Review your post"]}
          renderLabel={renderLabel}
          onPress={onStepPress}
          stepCount={3}
        />
      </View>
      <View className="flex flex-row mx-6 justify-between">
        <TouchableOpacity
          className="  "
          onPress={onPressLeft}
          disabled={leftDisable}
        >
          <MaterialIcons name="navigate-before" size={40} color={leftColor} />
        </TouchableOpacity>

        <TouchableOpacity
          className=""
          onPress={onPressRight}
          disabled={rightDisable}
        >
          <MaterialIcons name="navigate-next" size={40} color={rightColor} />
        </TouchableOpacity>
      </View>

      {currentPage === 0 && <RichText editor={editor} />}
      {currentPage === 0 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={exampleStyles.keyboardAvoidingView}
        >
          <Toolbar editor={editor} />
        </KeyboardAvoidingView>
      )}
      {renderTab(currentPage)}
    </SafeAreaView>
  );
};

export default CreatePostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    marginVertical: 10,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#999999",
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#4aae4f",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 20,
    //marginHorizontal: 2,
    marginVertical: 3,
  },
  input_container: {
    width: "90%",
    marginVertical: 8,
  },
  input_multilines: {
    flex: 1,
    height: 80,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 20,
    //marginHorizontal: 2,
    marginVertical: 3,
  },
  image: {
    width: 350,
    height: 200,
  },
});

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
