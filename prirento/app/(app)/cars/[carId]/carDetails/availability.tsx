import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { usePathname } from "expo-router";
import { useCarAvailabilitiesQuery } from "@/hooks/queries.hook";
import { useQueryClient } from "@tanstack/react-query";
import { Colors } from "@/constants/Colors";
import { formatDate } from "@/lib/utils";
import CarAvailabilitysModal from "@/components/car-availability-modal";
import { useModal } from "@/hooks/modal-hook";
import { CarAvailability } from "@/types";

const Availability = () => {
  const pathname = usePathname();
  const carId = pathname.split("/")[2];
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const { availability, setAvailability } = useModal();

  const { data, error, isLoading, refetch } = useCarAvailabilitiesQuery(carId);

  const [carAvailabilityModal, setCarAvailabilityModal] = useState<
    CarAvailability | undefined
  >(undefined);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetch()]);
      queryClient.invalidateQueries({ queryKey: ["availability", carId] });
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );
  }

  if (!data?.success || error)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Something went wrong!</Text>
        <TouchableOpacity onPress={onRefresh} style={{ marginTop: 12 }}>
          <Text>Try Again!</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity
        onPress={() => {
          setAvailability(true);
          setCarAvailabilityModal(undefined);
        }}
        style={{
          padding: 6,
          backgroundColor: Colors.mainDark,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Add New Block Date
        </Text>
      </TouchableOpacity>
      {!data.availabilities.length ? (
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 16,
            color: "gray",
          }}
        >
          No Blockings Added
        </Text>
      ) : (
        <View style={{ marginTop: 20 }}>
          {data.availabilities.map((el) => (
            <View
              key={el.id}
              style={{
                padding: 8,
                borderWidth: 0.7,
                borderColor: Colors.border2,
                marginTop: 5,
                borderRadius: 5,
              }}
            >
              {el.label && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontWeight: "500" }}>Label: </Text>
                  <Text style={{ fontWeight: "500", color: "gray" }}>
                    {el.label}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text style={{ fontWeight: "500" }}>Start Date: </Text>
                <Text style={{ fontWeight: "500", color: "gray" }}>
                  {formatDate(new Date(el.startDate))}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text style={{ fontWeight: "500" }}>End Date: </Text>
                <Text style={{ fontWeight: "500", color: "gray" }}>
                  {formatDate(new Date(el.endDate))}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setCarAvailabilityModal(el);
                  setAvailability(true);
                }}
                style={{
                  marginTop: 12,
                  backgroundColor: Colors.mainDark,
                  padding: 3,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <CarAvailabilitysModal
        isVisible={availability}
        onClose={() => setAvailability(false)}
        carId={carId}
        carAvailability={carAvailabilityModal}
      />
    </ScrollView>
  );
};

export default Availability;

const styles = StyleSheet.create({});
