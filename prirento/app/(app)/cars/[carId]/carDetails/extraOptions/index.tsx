import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useCarExtraOptionsQuery } from "@/hooks/queries.hook";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { ExtraOption } from "@/types";

import { useCarExtraOptions } from "@/hooks/car-extraOptions.hook";


const ExtraOtions = () => {
  const pathname = usePathname();
  const carId = pathname.split("/")[2];
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter()

  const {
    data: extraOptions,
    isLoading: extraOptionsIsLoading,
    error: extraOptionsError,
    refetch: refetchExtraOptions,
  } = useCarExtraOptionsQuery(carId as string);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetchExtraOptions()]);
      queryClient.invalidateQueries({ queryKey: ["extraOptions", carId] });
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, [extraOptions, refetchExtraOptions]);



  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: Colors.mainDark,
          borderRadius: 5,
          padding: 8,
          marginBottom:20
        }}
        onPress={() => {
          router.push(`/(app)/cars/${carId}/carDetails/extraOptions/new`)

        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "600" }}
        >
          Add Extra Option
        </Text>
      </TouchableOpacity>
      {!!extraOptionsIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.mainDark} />
        </View>
      ) : !extraOptions?.success ? (
        <View>
          {" "}
          <Text>{extraOptions?.error}</Text>
        </View>
      ) : !extraOptions.extraOptions.length ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "500",
            color: "gray",
          }}
        >
          No Extra Options
        </Text>
      ) : (
        extraOptions.extraOptions.map((el) => (
          <View
            key={el.id}
            style={{
              borderWidth: 0.7,
              borderColor: Colors.border2,
              borderRadius: 5,
              padding: 8,
              marginBottom: 12,
            }}
          >
            <Image
              source={{ uri: el.logo }}
              style={{ width: "100%", aspectRatio: 2 / 1, borderRadius: 5 }}
              resizeMode="contain"
            />
            <View>
              <Text style={{ textTransform: "capitalize", fontWeight: "500" }}>
                {el.label}
              </Text>
              <Text style={{ color: "gray", textTransform: "capitalize" }}>
                {el.description}
              </Text>
              <Text style={{ color: "gray", textTransform: "capitalize" }}>
                <Text style={{ textTransform: "uppercase" }}>AED</Text>{" "}
                {el.price.toFixed(2)}
              </Text>
              <Text style={{ color: "gray", textTransform: "capitalize" }}>
                {el.status}
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: Colors.secondaryGreen,
                  borderRadius: 5,
                  padding: 8,
                }}
                onPress={() => {
     router.push(`/(app)/cars/${carId}/carDetails/extraOptions/${el.id}`)
      
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

    </ScrollView>
  );
};

export default ExtraOtions;

const styles = StyleSheet.create({});
