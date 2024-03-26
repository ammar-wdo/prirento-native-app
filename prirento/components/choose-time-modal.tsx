import { useCarExtraOptions } from "@/hooks/car-extraOptions.hook";
import { carColorsMapper } from "@/schemas";
import { ExtraOption } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Input from "./Input";
import { Image } from "react-native";

import CustomButton from "./custom-button";
import { Colors } from "@/constants/Colors";
import { useImageUploader } from "./image-uploader";
import { ImageComponent } from "./image-component-upload";
import { generateHourlyTimes } from "@/lib/utils";

interface CustomColorPickerModalProps {
  isVisible: boolean;
  
  selectTime: (val: string) => void;
  onClose: () => void;
}
const ChooseTimeModal: React.FC<CustomColorPickerModalProps> = ({
  isVisible,
  selectTime,


  onClose,
}) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
        <Text
              style={{
                textAlign: "center",
                fontSize: 20,

                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              choose time
            </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          
            <View  style={{marginTop:10,alignItems:'center'}}>
              {generateHourlyTimes().map((time) => (
                <Text
                key={time}
                  onPress={() => {selectTime(time);onClose()}}
                  style={{ padding: 10, fontWeight: "600" ,width:'100%',textAlign:'center'}}
                >
                  {time}
                </Text>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={22} />
          </TouchableOpacity>
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
    width: "70%",
    height: "45%",
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
    alignSelf: "center",
    padding: 12,
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ChooseTimeModal;
