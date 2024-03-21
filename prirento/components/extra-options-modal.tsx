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
} from "react-native";
import Input from "./Input";
import { Image } from "react-native";
import ImageUploader from "./image-uploader";


interface CustomColorPickerModalProps {
  isVisible: boolean;
  carId:string
extraOption:ExtraOption|undefined
onClose:()=>void



 
}
const ExtraOptionsModal: React.FC<CustomColorPickerModalProps> = ({
  isVisible,
extraOption,
carId,


  onClose,
}) => {

    const {form,onSubmit} = useCarExtraOptions(extraOption,carId)

  useEffect(()=>{
    if(extraOption){
      form.reset(extraOption)
    }else{
      form.reset({description:'',label:'',logo:'',price:0})
    }
  },[extraOption])

    
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView style={{ width: "100%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              {extraOption
                ? "Edit " + extraOption.label
                : "Add New Extra Option"}
            </Text>

            <View style={{ marginTop: 12 }}>

              <View>
                <Controller
                  control={form.control} // From useForm()
                  name="label"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input value={value} setValue={onChange} label="Label" />
                  )}
                />
              </View>
              <View style={{marginTop:8}}>
              <Controller
                control={form.control} // From useForm()
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    setValue={onChange}
                    label="Description"
                    
                  />
                )}
              />
              </View>
              <View style={{marginTop:8}}>
              <Controller
                control={form.control} // From useForm()
                name="price"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={(value || '').toString()}
                    setValue={onChange}
                    label="price"
                    numeric={true}
                    
                  />
                )}
              />
              </View>
              <View style={{marginTop:12}}>
                <Text style={{fontWeight:'800'}}>Logo</Text>
              <Image source={{uri:extraOption?.logo}} />
              <ImageUploader onUploadSuccess={(value)=>form.setValue('logo',value)} />
              </View>
            

              <Text>{extraOption?.label}</Text>
            </View>
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontWeight: "600" }}>Close </Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  colorOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%", // Ensure the touchable area spans the full width
  },
  modalContent: {
    width: "80%",
    height: "80%",
    overflow: "scroll",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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

export default ExtraOptionsModal;
