import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
    const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          
          title: "Add New Car",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerLeft:()=><Ionicons size={20} name="arrow-back" onPress={()=>router.push('/(app)')} />
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
