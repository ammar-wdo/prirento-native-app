import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false ,headerTintColor:Colors.secondaryGreen}} />
      <Stack.Screen
        name="notifications"
        options={{
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          presentation: "modal",
          animation: "slide_from_bottom",
          
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
