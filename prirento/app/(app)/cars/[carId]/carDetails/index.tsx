import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCustomQuery } from "@/hooks/custom-query.hook";
import { SingleCarDetails } from "@/types";
import CustomHeader from "@/components/custom-header";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

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
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );
  }
  if (!data?.success) return <Text>{data?.error}</Text>;


  return (
    <View style={{ flex: 1 ,position:'relative'}}>


      <Text>{data?.car.carName}</Text>
    </View>
  );
};

export default CarDetails;

const styles = StyleSheet.create({});
