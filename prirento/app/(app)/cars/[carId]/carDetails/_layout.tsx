import { StyleSheet, Text, View } from "react-native";
import { Tabs, useLocalSearchParams, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Colors } from "@/constants/Colors";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const _layout = () => {
  const {carId} = useLocalSearchParams()
  return (
    <TopTabs
    screenOptions={{
 
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600",textTransform:'capitalize' },
        tabBarIndicatorStyle: { backgroundColor: Colors.golden,height:3,borderTopRightRadius:15,borderTopLeftRadius:15 },
        tabBarActiveTintColor: Colors.golden,
        tabBarInactiveTintColor: 'gray', 
       
      
      }}
    >
      <TopTabs.Screen name="index" options={{ title: "Edit" }} />
      <TopTabs.Screen name="pricings" options={{ title: "Pricing"}} />
      <TopTabs.Screen name="availability" options={{ title: "Availability" }} />
      <TopTabs.Screen
        name="extraOptions"
        options={{ title: "Extra Options" }}
      />
    </TopTabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
