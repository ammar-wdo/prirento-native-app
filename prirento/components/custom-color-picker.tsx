import { carColorsMapper } from '@/schemas';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

interface CustomColorPickerModalProps {
  isVisible: boolean;
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onClose: () => void;
}
const CustomColorPickerModal: React.FC<CustomColorPickerModalProps> = ({
    isVisible,
    colors,
    selectedColor,
    onSelectColor,
    onClose,
  }) => {
    return (
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <ScrollView style={{width:'100%'}} >
            {colors.map((color) => (
              <TouchableOpacity 
                key={color} 
                onPress={() => {onSelectColor(color);onClose()}} 
                style={styles.colorOption}
              >
                <View style={[styles.colorCircle, { backgroundColor: carColorsMapper[color]  }]} />
                <Text style={styles.colorText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%', // Ensure the touchable area spans the full width
  },
  modalContent: {
    width: '80%',
    height:'80%',
    overflow:'scroll',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  colorText: {
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
  },
});

export default CustomColorPickerModal;
