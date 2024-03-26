import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export const ImageComponent = ({pickImage}:{pickImage:()=>void})=> (
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