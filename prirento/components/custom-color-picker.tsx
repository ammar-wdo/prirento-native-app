import { carColorsMapper } from '@/schemas';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

interface CustomColorPickerModalProps {
  isVisible: boolean;
  items: string[];
  isColor?:boolean
  selectedItem: string;
  onSelectItem: (color: string) => void;
  onClose: () => void;
}
const CustomItemsPickerModal: React.FC<CustomColorPickerModalProps> = ({
    isVisible,
    items,
    selectedItem,
    onSelectItem,
    onClose,
    isColor
  }) => {
    return (
      <Modal visible={isVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <ScrollView style={{width:'100%'}} >
            {items.map((item) => (
              <TouchableOpacity 
                key={item} 
                onPress={() => {onSelectItem(item);onClose()}} 
                style={styles.colorOption}
              >
             { isColor &&   <View style={[styles.colorCircle, { backgroundColor: carColorsMapper[item]  }]} />}
                <Text style={styles.colorText}>{item}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
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

export default CustomItemsPickerModal;
