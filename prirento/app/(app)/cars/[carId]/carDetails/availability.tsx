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
import React, { useState } from "react";
import { usePathname } from "expo-router";
import { useCarAvailabilitiesQuery } from "@/hooks/queries.hook";
import { useQueryClient } from "@tanstack/react-query";
import { Colors } from "@/constants/Colors";
import { formatDate, remover } from "@/lib/utils";
import CarAvailabilitysModal from "@/components/car-availability-modal";
import { useModal } from "@/hooks/modal-hook";
import { CarAvailability } from "@/types";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DELETE_CAR_AVAILABILITY } from "@/links";
import { useAuth } from "@/hooks/auth.hook";
import ErrorComponent from "@/components/error-component";
import LogoutComponent from "@/components/logout-component";

const Availability = () => {
  const pathname = usePathname();
  const carId = pathname.split("/")[2];
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const { availability, setAvailability } = useModal();

  const { data, error, isLoading, refetch } = useCarAvailabilitiesQuery(carId);

  const { user,signout } = useAuth();

  const [carAvailabilityModal, setCarAvailabilityModal] = useState<
    CarAvailability | undefined
  >(undefined);

  const [isLoadingDelete, setIsLoadingDelete] = useState("");

  const handleDelete = async (availabilityId: string, carId: string) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setIsLoadingDelete(availabilityId);
              const res = await remover<{
                success: boolean;
                error?: string;
                message?: string;
              }>(DELETE_CAR_AVAILABILITY(carId, availabilityId), user?.token);
              if (res.success) {
                queryClient.refetchQueries({
                  queryKey: ["availability", carId],
                });
                Alert.alert("Successfully Deleted");
              } else if (!res.success) {
                Alert.alert(res.error!);
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Something went wrong");
            } finally {
              setIsLoadingDelete("");
            }
          },
        },
      ],
      { cancelable: false } // This ensures the alert is not dismissable by tapping outside of it
    );
  };

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

  if ((!data?.success && !!data?.logout))
    return <LogoutComponent />;

  if (!data?.success || error )
    return (
  <ScrollView 
  refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}
  contentContainerStyle={{flex:1,alignItems:'center',justifyContent:'center'}}
  
  >
     <ErrorComponent text="Something went wrong!" onRefresh={onRefresh} />
      </ScrollView>
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
          flexDirection: "row",
          paddingVertical: 11,
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="add-circle-outline" color={"white"} size={20} />
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "600" }}
        >
          New Block Date
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
                  backgroundColor: Colors.secondaryGreen,

                  padding: 6,
                  borderRadius: 5,
                  flexDirection: "row",
                  gap: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name={"edit"} size={16} color={"white"} />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={isLoadingDelete === el.id}
                onPress={() => handleDelete(el.id, carId)}
                style={{
                  backgroundColor: "red",
                  marginTop: 4,
                  opacity:isLoadingDelete === el.id ? 0.5 : 1,

                  padding: 6,
                  borderRadius: 5,
                
                  gap: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isLoadingDelete === el.id ? (
                  <ActivityIndicator color={"white"} size={"small"} />
                ) : (
                  <View style={{  flexDirection: "row",   justifyContent: "center",
                  alignItems: "center",gap: 12,}}>
                    <Ionicons name="trash" size={16} color={"white"} />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </Text>
                  </View>
                )}
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
