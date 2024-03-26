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

interface CustomColorPickerModalProps {
  isVisible: boolean;
  carId: string;
  extraOption: ExtraOption | undefined;
  onClose: () => void;
}
const ExtraOptionsModal: React.FC<CustomColorPickerModalProps> = ({
  isVisible,
  extraOption,
  carId,

  onClose,
}) => {
  const { form, onSubmit } = useCarExtraOptions(extraOption, carId);

  const {loading,pickImage} = useImageUploader({onUploadSuccess:(url:string)=>form.setValue('logo',url)})

  useEffect(() => {
    if (extraOption) {
      form.reset(extraOption);
    } else {
      form.reset({ description: "", label: "", logo: "", price: 0 });
    }
  }, [extraOption]);

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true} >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
     <ScrollView showsVerticalScrollIndicator={false}>
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

            <View style={{ marginTop: 12 ,flex:1,}}>
              <View>
                <Controller
                  control={form.control} // From useForm()
                  name="label"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input value={value} setValue={onChange} label="Label" />
                  )}
                />
                {form.formState.errors.label && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.label.message}
                </Text>
              )}
              </View>
              <View style={{ marginTop: 8 }}>
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
                {form.formState.errors.description && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.description.message}
                </Text>
              )}
              </View>
              <View style={{ marginTop: 8 }}>
                <Controller
                  control={form.control} // From useForm()
                  name="price"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={(value || "").toString()}
                      setValue={onChange}
                      label="price"
                      numeric={true}
                    />
                  )}
                />
                {form.formState.errors.price && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.price.message}
                </Text>
              )}
              </View>
              <View style={{ marginTop: 8 }}>
                <Controller
                  control={form.control} // From useForm()
                  name="logo"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ width: "100%" }}>
                      <Text style={{ fontWeight: "800" }}>Logo</Text>
                      {!!value && (
                        <Image
                          source={{ uri: value }}
                          style={{
                            width: 200,
                            aspectRatio: 2 / 1.4,
                            alignSelf: "center",
                            borderRadius: 5,marginTop:4
                          }}
                          resizeMode="cover"
                        />
                      )}
                      <ImageComponent
                      pickImage={pickImage}
                      />
                      {loading && <ActivityIndicator size={20} color={Colors.mainDark} />}
                    </View>
                  )}
                />
                {form.formState.errors.logo && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.logo.message}
                </Text>
              )}
              </View>
              <CustomButton
              onPress={form.handleSubmit(onSubmit)}
                title={extraOption ? "Update" : "Create"}
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
                style={{backgroundColor:Colors.mainDark,marginTop:'auto',borderRadius:12,paddingVertical:11}}
              />
            </View>
     
     
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
         <Ionicons name="close"  size={22}/>
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
    position:'relative',
 
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

    alignSelf:'center',
padding:12,
position:'absolute',
top:10,
right:10,
  

  },
});

export default ExtraOptionsModal;
