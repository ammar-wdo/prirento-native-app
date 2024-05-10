import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as IntentLauncher from 'expo-intent-launcher';
import SettingsElement from "@/components/settings-element";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

import { Ionicons } from "@expo/vector-icons";
import { useModal } from "@/hooks/modal-hook";
import ExitModal from "@/components/exit-modal";
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher'
import * as Linking from 'expo-linking';
import * as Application from 'expo-application';





const index = () => {

  const router = useRouter();

const {logout,setLogout} = useModal()



const onPress = async () => {
  if (Platform.OS === 'android') {

    // Use a generalized settings intent for compatibility with Expo Go
    try {
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.APP_NOTIFICATION_SETTINGS, {
          data: `package:${Application.applicationId}`
        }
      );
    } catch (e) {
      console.error('Failed to open general settings:', e);
    }
  } else if (Platform.OS === 'ios') {
    // For iOS, this opens the app-specific settings page
    try {
      await Linking.openURL('app-settings:');
    } catch (e) {
      console.error('Failed to open app settings:', e);
    }
  }
};


  return (
    <View style={{ padding: 12, flex: 1, backgroundColor: "white" }}>
 <Stack.Screen    options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerLeft:()=><Ionicons size={20} style={{marginLeft:12,padding:12}} name="arrow-back" onPress={()=>router.push('/(app)')} />,
          headerBackTitleVisible:false
        }} />
      {Platform.OS === 'ios' && <SettingsElement
        title="Notifications"
        push={onPress}
      />}
      <SettingsElement
        title="Terms & Conditions"
        push={() => router.push("https://www.prirento.ae/terms-and-conditions")}
      />
      <SettingsElement
        title="Privacy Policy"
        push={() => router.push("https://www.prirento.ae/privacy-policy")}
      />
   
      <TouchableOpacity
        onPress={()=>setLogout(true)}
        style={{
          marginTop: 25,
          borderWidth: 0.7,
          borderColor: Colors.border2,
          borderRadius: 100,
          width: "100%",
          paddingVertical: 13,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "500" }}>Sign Out</Text>
      </TouchableOpacity>
      <ExitModal isVisible={logout} onClose={()=>setLogout(false)} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
