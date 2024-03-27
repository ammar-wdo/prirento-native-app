import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";

import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Colors } from "@/constants/Colors";

interface CustomColorPickerModalProps {
  isVisible: boolean;
  date: string;
  onChange: (value: string) => void;

  onClose: () => void;
}
const CalendarModal: React.FC<CustomColorPickerModalProps> = ({
  isVisible,
  date,
  onChange,

  onClose,
}) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20 }}>
              <DatePicker
              minimumDate={date}
                options={{ mainColor: Colors.mainDark }}
                mode="calendar"
              current={date}
                selected={date}
                onDateChange={(val) =>{ onChange(val.replace(/\//g, '-'));onClose()}}
              />
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
    width: "90%",
    height: "85%",
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

export default CalendarModal;
