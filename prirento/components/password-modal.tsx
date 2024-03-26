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
  TextInput,
} from "react-native";
import Input from "./Input";
import { Image } from "react-native";

import CustomButton from "./custom-button";
import { Colors } from "@/constants/Colors";
import { usePassword } from "@/hooks/password.hook";
import { useModal } from "@/hooks/modal-hook";

interface CustomColorPickerModalProps {
  isVisible: boolean;

  onClose: () => void;
}
const PasswordModal: React.FC<CustomColorPickerModalProps> = ({
  isVisible,

  onClose,
}) => {
  const {
    form,
    onSubmit,
    error,
    setError,
    passwordEye,
    setPasswordEye,
    newPasswordEye,
    setNewPasswordEye,
    confirmPasswordEye,
    setConfirmPasswordEye,
  } = usePassword();

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
        <TouchableOpacity
            onPress={() => {
              onClose();
              form.reset();
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
            <Text style={{ color: "gray", fontSize: 25 }}>Change Password</Text>
          </View>
          {/* container */}
          <View style={{ marginTop: 25 }}>
            <Text style={{ fontWeight: "500", marginBottom: 5 }}>
              Previous Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                padding: 12,
                borderWidth: 0.7,
                borderColor: Colors.border2,
                borderRadius: 5,
              }}
            >
              <TextInput
               secureTextEntry={!passwordEye}
                placeholder="Previous Password"
                style={{ flex: 1 }}
                onChangeText={(text) =>
                {  form.setValue("password", text, { shouldValidate: true });
            setError('')
            }
                }
              />
              <TouchableOpacity onPress={()=>setPasswordEye(!passwordEye)}>
                <Ionicons name={!passwordEye ? "eye-off-outline" : 'eye-outline'} size={20} />
              </TouchableOpacity>
            </View>
            {form.formState.errors.password && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {form.formState.errors.password.message}
              </Text>
            )}
            <Text style={{ fontWeight: "500", marginBottom: 5, marginTop: 16 }}>
              New Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                padding: 12,
                borderWidth: 0.7,
                borderColor: Colors.border2,
                borderRadius: 5,
              }}
            >
              <TextInput
              secureTextEntry={!newPasswordEye}
                placeholder="New Password"
                style={{ flex: 1 }}
                onChangeText={(text) =>
                 { form.setValue("newPassword", text, { shouldValidate: true });setError('')}
                }
              />
               <TouchableOpacity onPress={()=>setNewPasswordEye(!newPasswordEye)}>
                <Ionicons name={!newPasswordEye ? "eye-off-outline" : 'eye-outline'} size={20} />
              </TouchableOpacity>
            </View>
            {form.formState.errors.newPassword && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {form.formState.errors.newPassword.message}
              </Text>
            )}
            <Text style={{ fontWeight: "500", marginBottom: 5, marginTop: 16 }}>
              Confirm Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                padding: 12,
                borderWidth: 0.7,
                borderColor: Colors.border2,
                borderRadius: 5,
              }}
            >
              <TextInput
              secureTextEntry={!confirmPasswordEye}
                placeholder="Confirm Password"
                style={{ flex: 1 }}
                onChangeText={(text) =>
                {  form.setValue("confirmPassword", text, {
                    shouldValidate: true,
                  });setError('')}
                }
              />
             <TouchableOpacity onPress={()=>setConfirmPasswordEye(!confirmPasswordEye)}>
                <Ionicons name={!confirmPasswordEye ? "eye-off-outline" : 'eye-outline'} size={20} />
              </TouchableOpacity>
            </View>
            {form.formState.errors.confirmPassword && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {form.formState.errors.confirmPassword.message}
              </Text>
            )}
          </View>
          {error && <Text style={{marginVertical:12,color:'red'}}>{error}</Text>}
          <CustomButton
            title="Update"
            style={{ backgroundColor: Colors.mainDark, marginTop: 12 }}
            loading={form.formState.isSubmitting}
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          />
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

export default PasswordModal;
