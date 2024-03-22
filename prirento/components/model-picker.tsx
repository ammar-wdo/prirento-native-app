import { carColorsMapper } from '@/schemas';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

interface CustomColorPickerModalProps {
  isVisible: boolean;
  items: {id:string,name:string,carBrand:{brand:string,logo:string}}[];

  selectedItem: string;
  onSelectItem: (color: string) => void;
  onClose: () => void;
}
const CustomModePickerModal: React.FC<CustomColorPickerModalProps> = ({
    isVisible,
    items,
    selectedItem,
    onSelectItem,
    onClose,

  }) => {
    return (
      <Modal visible={isVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <ScrollView style={{width:'100%'}} >
            {items.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => {onSelectItem(item.id);onClose()}} 
                style={styles.colorOption}
              >
    
                <Text style={styles.Text}>{item.carBrand.brand} {item.name}</Text>
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
  Text: {
    marginLeft: 10,
    textTransform:'capitalize'
  },
  closeButton: {
    marginTop: 20,
  },
});

export default CustomModePickerModal;
