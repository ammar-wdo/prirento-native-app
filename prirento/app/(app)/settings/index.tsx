import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsElement from "@/components/settings-element";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/auth.hook";
import { Ionicons } from "@expo/vector-icons";

const index = () => {
  const router = useRouter();

  const { signout } = useAuth();
  return (
    <View style={{ padding: 12, flex: 1, backgroundColor: "white" }}>
 
      <SettingsElement
        title="Notifications"
        push={() => router.push("/(modals)/notifications")}
      />
      <SettingsElement
        title="Terms & Conditions"
        push={() => router.push("/(modals)/terms")}
      />
      <SettingsElement
        title="Privacy Policy"
        push={() => router.push("/(modals)/privacy")}
      />
      <SettingsElement
        title="Help & Support"
        push={() => router.push("/(modals)/help")}
      />
      <TouchableOpacity
        onPress={signout}
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
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
