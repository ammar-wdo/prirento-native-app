import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
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

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
  const [image, setImage] = useState<string | null>(null);
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
    const data = new FormData();
    data.append("file", uri); // Directly use the URI string
    data.append("upload_preset", "prirento");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzjcvb26j/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.secure_url) {
        onUploadSuccess(jsonResponse.secure_url);
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Failed", "Failed to upload image. Please try again.");
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{alignItems:'center',width:'100%',marginVertical:12,flexDirection:'row',justifyContent:'center',gap:3,backgroundColor:Colors.mainDark,padding:12,borderRadius:12}}
    >
      <Ionicons name="image-outline" size={20} color={'white'} />
      <Text style={{fontWeight:'600',color:'white'}}>
        Pick an image
      </Text>
    </TouchableOpacity>
  );
};

export default ImageUploader;
