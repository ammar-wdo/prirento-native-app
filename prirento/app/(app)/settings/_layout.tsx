import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLeft: () => (
            <Ionicons
            size={25}
              name="arrow-back"
              onPress={() => router.push("/(app)/(home)")}
            />
          ),
          headerTitleAlign:'center'
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
          headerLeft: () => (
            <Ionicons
            size={25}
              name="arrow-back"
              onPress={() => router.push("/(app)/settings")}
            />
          ),
          headerTitleAlign:'center'
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          title: "Terms & Conditions",
          headerLeft: () => (
            <Ionicons
            size={25}
              name="arrow-back"
              onPress={() => router.push("/(app)/settings")}
            />
          ),
          headerTitleAlign:'center'
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: "Privacy Policy",
          headerLeft: () => (
            <Ionicons
            size={25}
              name="arrow-back"
              onPress={() => router.push("/(app)/settings")}
            />
          ),
          headerTitleAlign:'center'
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "Help & Support",
          headerLeft: () => (
            <Ionicons
            size={25}
              name="arrow-back"
              onPress={() => router.push("/(app)/settings")}
            />
          ),
          headerTitleAlign:'center'
        }}
      />
     
      
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
