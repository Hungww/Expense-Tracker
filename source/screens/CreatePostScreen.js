import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import StepIndicator from "react-native-step-indicator";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { RichText, Toolbar, useEditorBridge,useEditorContent } from "@10play/tentap-editor";

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
  const [currentPage, setCurrentPage] = React.useState(0);
  const [leftColor, setLeftColor] = React.useState("#808080");
  const [leftDisable, setLeftDisable] = React.useState(true);
  const [rightColor, setRightColor] = React.useState("#19B079");
  const [rightDisable, setRightDisable] = React.useState(false);

  const [content, setContent] = React.useState("");

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });
  
  const initialContent = "";
  function setButton(cur){
    if (cur === 0) {
      setLeftColor("#808080");
      setLeftDisable(true);
      setRightColor("#19B079");
      setRightDisable(false);
    }
    else if (cur === 1) {
        setLeftColor("#19B079");
        setLeftDisable(false);
        setRightColor("#19B079");
        setRightDisable(false);
        }
    else if (cur === 2) {
            setLeftColor("#19B079");
            setLeftDisable(false);
            setRightColor("#808080");
            setRightDisable(true);
            }
  }
  function onPressLeft() {
    if (currentPage > 0) {
        setButton(currentPage-1);


      setCurrentPage( prev => prev - 1)
      console.log(content);
    }



  }
  async function onPressRight() {
    if (currentPage < 2) {    
        if (currentPage === 0){
            editor.setContent("<p>This is a basic example!</p>");
            newcont = await editor.getHTML();
            setContent(newcont);
          
        }
        
      setButton(currentPage+1);  
        setCurrentPage( prev => prev + 1)


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

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={firstIndicatorStyles}
          currentPosition={currentPage}
          labels={["Create ", "Profile", "Band"]}
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
      {currentPage === 1 && <RichText editor={editor} />}
      {currentPage === 1 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={exampleStyles.keyboardAvoidingView}
        >
          <Toolbar editor={editor} />
        </KeyboardAvoidingView>
      )}
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
