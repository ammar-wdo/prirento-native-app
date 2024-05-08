import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Slot, Stack, useLocalSearchParams, useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import CustomHeader from "@/components/custom-header";
import { Ionicons } from "@expo/vector-icons";
import { CarDetail } from "@/schemas";
import { useCarQuery } from "@/hooks/queries.hook";
import { LinearGradient } from "expo-linear-gradient";
import { capitalizer } from "@/lib/utils";
import ErrorComponent from "@/components/error-component";
import { useAuth } from "@/hooks/auth.hook";
import LogoutComponent from "@/components/logout-component";

const _layout = () => {
  const { carId } = useLocalSearchParams();
  const router = useRouter();
  const { signout } = useAuth()

  const { isLoading, data,refetch,error } = useCarQuery(carId as string);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.error("Failed to refetch cars:", error);
      // Handle the error as needed
    } finally {
      setRefreshing(false); // Always stop the refreshing indicator
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );
  }

  if (
    (!data?.success && !!data?.logout)
  
  )
    return <LogoutComponent />;

  if (!data?.success || error ) return  <ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  style={{ flex: 1 }}
  contentContainerStyle={{
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }}
>
<ErrorComponent text="Something went wrong!" onRefresh={onRefresh} />
          <TouchableOpacity onPress={()=>router.push('/(app)/cars')}   style={{
            marginTop: 8,
            backgroundColor: Colors.mainDark,
            padding: 8,
            borderRadius: 5,
          }}>
            <Text style={{ color: "white" }}>Back to Cars screen</Text>
          </TouchableOpacity>
</ScrollView>

  return (
    <View style={{flex:1}}>
         
   <SafeAreaView style={{ flex: 1 }}>
  
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: data.car.gallary[0] }}
          style={{ aspectRatio: 2 / 1, width: "100%" }}
        />
        
        <TouchableOpacity
          onPress={() => router.push("/(app)/cars")}
          style={{ position: "absolute", top: 20, left: 10, zIndex: 10,padding:10 }}
        >
          <Ionicons name="arrow-back" size={20} color={"white"} />
        </TouchableOpacity>
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.4)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 15,
            left: 20,
            color: "white",
            fontWeight: "500",
            fontSize: 20,
          }}
        >
          {capitalizer(data.car.brand)} {capitalizer(data.car.model)}
        </Text>
      </View>

      <Slot />
    </SafeAreaView>
    </View>
 
  );
};

export default _layout;

const styles = StyleSheet.create({});
