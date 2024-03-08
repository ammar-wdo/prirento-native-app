import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCustomQuery } from "@/hooks/custom-query.hook";
import { SingleCarDetails } from "@/types";
import CustomHeader from "@/components/custom-header";
import { Ionicons } from "@expo/vector-icons";

const CarDetails = () => {
  const { carId } = useLocalSearchParams();
  const router = useRouter()

  const { data, isLoading, error } = useCustomQuery<{
    success: boolean;
    car: SingleCarDetails;
    error?: string;
  }>(
    `details-${carId}`,
    `http://10.0.2.2:3001/api/native/car/${carId}/details`
  );
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (!data?.success) return <Text>{data?.error}</Text>;


  return (
    <View style={{ flex: 1 ,position:'relative'}}>
   <CustomHeader/>
   <Image source={{uri:data.car.gallary[0]}} style={{width:'100%',aspectRatio:2/1}} resizeMode="cover"/>
   <TouchableOpacity style={{position:'absolute',top:80,left:20}} onPress={()=>router.push('/(app)/cars')}>
    <Ionicons name="arrow-back" size={20} color={'white'}/>
   </TouchableOpacity>

      <Text>{data?.car.carName}</Text>
    </View>
  );
};

export default CarDetails;

const styles = StyleSheet.create({});
