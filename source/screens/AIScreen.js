import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function AIScreen() {
  const [image, setImage] = useState("");
  const [type, setType] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });


    
    let type = result.assets[0].mimeType;
    
    

    if (!result.canceled) {
      setType(type);}
      setImage("data:"+type+";base64,"+result.assets[0].base64);
      axios.post('http://192.168.0.107:3000/', {ImageData: image}).then((response) => {
        console.log(response.data);
        
      });
      
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}