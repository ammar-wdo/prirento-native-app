import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomHeader from "@/components/custom-header";
import {
  useBookingsInfoQuery,
  useRecentBookingsQuery,
  useRecentCarsQuery,
} from "@/hooks/queries.hook";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import RecentCarCard from "@/components/recent-car-card";
import { Colors } from "@/constants/Colors";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

import BookingCardComponent from "@/components/bookings-card";
import { boolean } from "zod";
import { getCurrentMonthYear } from "@/lib/utils";

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const clientQuery = useQueryClient();

  const {
    data: recentData,
    isLoading: recentIsLoading,
    error: recentError,
    refetch: recentRefetch,
  } = useRecentCarsQuery();

  const {
    data: recentBookingsData,
    isLoading: recentBookingsLoading,
    error: recentBookingsError,
    refetch: recentBookingsRefetch,
  } = useRecentBookingsQuery();

  const {
    data: BookingsInfoData,
    isLoading: BookingsInfoLoading,
    error: BookingsInfoError,
    refetch: BookingsInfoRefetch,
  } = useBookingsInfoQuery();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([
        recentBookingsRefetch(),
        recentRefetch(),
        BookingsInfoRefetch(),
      ]);
      clientQuery.invalidateQueries({ queryKey: ["recentCars"] });
      clientQuery.invalidateQueries({ queryKey: ["recentBookings"] });
      clientQuery.invalidateQueries({ queryKey: ["bookingsInfo"] });
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const monthAndDate = getCurrentMonthYear();
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{ padding: 12 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Monthly bookings info */}
        <View>
          {BookingsInfoLoading ? (
            <View>
              <Text>Loading cars ...</Text>
            </View>
          ) : BookingsInfoError ? (
            <View>
              <Text>Something went wrong</Text>
            </View>
          ) : !BookingsInfoData?.success ? (
            <View>
              <Text>{BookingsInfoData?.error}</Text>
            </View>
          ) : (
            <View style={{ borderWidth: 0.7, borderColor: Colors.border2,        borderRadius:7 }}>
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 0.7,
                    borderBlockColor: Colors.border2,
                    paddingBottom: 12,
                    borderRadius:7
                  }}
                >
                  <Text
                    style={{ fontSize: 22, fontWeight: "500", color: "#777" }}
                  >
                    Monthly Summary
                  </Text>
                  <Text
                    style={{
                      paddingVertical: 7,
                      paddingHorizontal: 12,
                      backgroundColor: Colors.border2,
                      
                      
                    }}
                  >
                    {monthAndDate}
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* left */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.secondaryGreen,
                        borderRadius: 100,
                        width: 45,
                        height: 45,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="car-sport-outline"
                        color={"white"}
                        size={30}
                      />
                    </View>
                    <View style={{ gap: 4 }}>
                      <Text style={{ fontSize: 18, color: "gray" ,fontWeight:'500'}}>
                        {BookingsInfoData.bookingsInfo.count}
                      </Text>
                      <Text style={{ fontSize: 16, color: "#777" }}>
                        {BookingsInfoData.bookingsInfo.count > 1
                          ? "Cars Rented"
                          : "Car rented"}
                      </Text>
                    </View>
                  </View>

                  {/* right */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.secondaryGreen,
                        borderRadius: 100,
                        width: 45,
                        height: 45,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="wallet-outline"
                        color={"white"}
                        size={30}
                      />
                    </View>
                    <View style={{ gap: 4 }}>
                      <Text style={{ fontSize: 18, color: "gray" ,fontWeight:'500'}}>
                        {BookingsInfoData.bookingsInfo.total.toFixed(2)}
                      </Text>
                      <Text style={{ fontSize: 16, color: "#777" }}>Sales</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Most rented cars */}
        <Text style={{ fontWeight: "700", fontSize: 18, marginTop: 25 }}>
          Most Rented Cars
        </Text>
        {recentIsLoading ? (
          <View>
            <Text>Loading cars ...</Text>
          </View>
        ) : recentError ? (
          <View>
            <Text>Something went wrong</Text>
          </View>
        ) : !recentData?.success ? (
          <View>
            <Text>{recentData?.error}</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12 }}
            contentContainerStyle={{ paddingVertical: 5 }}
            data={recentData.cars}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            renderItem={({ item }) => <RecentCarCard car={item} />}
          />
        )}

        <View
          style={{
            marginTop: 40,
            borderColor: Colors.border2,
            borderWidth: 0.7,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              borderBottomColor: Colors.border2,
              borderBottomWidth: 0.7,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Ionicons name="car-sport-outline" size={30} color={"gray"} />
            <Text style={{ color: "gray", fontSize: 16 }}>Latest Bookings</Text>
          </View>
          <View>
            {recentBookingsLoading ? (
              <Text>Loading bookings...</Text>
            ) : recentBookingsError ? (
              <Text>Something went wrong</Text>
            ) : !recentBookingsData?.success ? (
              <Text>{recentBookingsData?.error}</Text>
            ) : (
              <View style={{ gap: 4 }}>
                {recentBookingsData.bookings.map((booking) => (
                  <BookingCardComponent key={booking.id} booking={booking} />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
