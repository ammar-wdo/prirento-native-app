
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,

} from "react-native";

import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/auth.hook";


interface CustomColorPickerModalProps {
  isVisible: boolean;

  onClose: () => void;
}
const ExitModal: React.FC<CustomColorPickerModalProps> = ({
  isVisible,

  onClose,
}) => {
 
const {signout} = useAuth()
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
        <TouchableOpacity
            onPress={() => {
              onClose();
            
            }}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={22} />
          </TouchableOpacity>
            <ScrollView>
          {/* header */}
        
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.border2,
              paddingBottom: 10,
            }}
          >
            <Text style={{ color: "gray", fontSize: 25 }}>Sign Out</Text>
          </View>
          {/* container */}
          <View style={{ marginTop: 25 }}>
          <Text style={{fontWeight:'600'}}>Are you sure you want to sign out ?</Text>

          <View style={{marginTop:30,flexDirection:'row',gap:20,alignItems:'center',justifyContent:'flex-end'}}>
          
            <TouchableOpacity onPress={onClose}>
<Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:Colors.mainDark,borderRadius:5,padding:6}} onPress={()=>{signout();onClose()}}>
                <Text style={{color:'white',fontWeight:'600'}}>Confirm</Text>
            </TouchableOpacity>

          </View>
          </View>
    
      
          </ScrollView>
        </View>
    
      </View>
  
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalContent: {
    width: "90%",
    height: "auto",
    position: "relative",

    overflow: "scroll",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  closeButton: {
    zIndex: 10,
    alignSelf: "center",
    padding: 12,
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ExitModal;
