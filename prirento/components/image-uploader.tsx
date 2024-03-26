import React, { useState, useEffect } from "react";
import {
 
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export const useImageUploader = ({ onUploadSuccess }:ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    console.log('uri',uri)
    const data = new FormData();
     // @ts-ignore
    data.append("file", {
     
      uri: uri,
      type:  'image/jpeg', 
      name:  'uploaded-image.jpg',
    }); // Directly use the URI string

    data.append("upload_preset", "prirento");
    data.append('cloud_name', 'dzjcvb26j')

    try {
      setLoading(true)
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzjcvb26j/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const jsonResponse = await response.json();
      console.log("Json response",jsonResponse)
      if (response.ok) {
        console.log("response",jsonResponse)
        onUploadSuccess(jsonResponse.url);
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Failed", "Failed to upload image. Please try again.");
    }finally{
      setLoading(false)
    }
  };




  return { loading ,pickImage}
};





