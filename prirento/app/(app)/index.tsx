import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
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
import { Ionicons } from "@expo/vector-icons";

import BookingCardComponent from "@/components/bookings-card";

import { getCurrentMonthYear } from "@/lib/utils";
import BarChartComponent from "@/components/bar-charts";
import BarChartComponentTwo from "@/components/bar-chart-two";
import { SplashScreen } from "expo-router";
import ErrorComponent from "@/components/error-component";
import { useAuth } from "@/hooks/auth.hook";
import LogoutComponent from "@/components/logout-component";

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const clientQuery = useQueryClient();
  const { signout } = useAuth();

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

  if (BookingsInfoLoading || recentIsLoading || recentBookingsLoading)
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={40} color={Colors.mainDark} />
        </View>
      </View>
    );

  SplashScreen.hideAsync();

  if (
    (!recentData?.success && !!recentData?.logout) ||
    (!recentBookingsData?.success && !!recentBookingsData?.logout) ||
    (!BookingsInfoData?.success && !!BookingsInfoData?.logout)
  )
    return <LogoutComponent />;

  if (
    !recentData?.success ||
    !recentBookingsData?.success ||
    !BookingsInfoData?.success ||
    !!BookingsInfoError ||
    !!recentBookingsError ||
    !!recentError
  )
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorComponent onRefresh={onRefresh} text="Something went wrong!" />
        </ScrollView>
      </View>
    );

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
          <View
            style={{
              borderWidth: 0.7,
              borderColor: Colors.border2,
              borderRadius: 7,
            }}
          >
            <View
              style={{
                backgroundColor: "#E7F9F6",
                overflow: "hidden",
                padding: 12,
              }}
            >
              <BarChartComponentTwo
                bookings={BookingsInfoData.bookingsInfo.bookings}
              />
            </View>
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 0.7,
                  borderBlockColor: Colors.border2,
                  paddingBottom: 12,
                  borderRadius: 7,
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
                    backgroundColor: Colors.lightGray,
                    borderRadius: 5,
                    color: "gray",
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
                    <Text
                      style={{
                        fontSize: 18,
                        color: "gray",
                        fontWeight: "500",
                      }}
                    >
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
                    <Ionicons name="wallet-outline" color={"white"} size={30} />
                  </View>
                  <View style={{ gap: 4 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "gray",
                        fontWeight: "500",
                      }}
                    >
                      {BookingsInfoData.bookingsInfo.total.toFixed(2)}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#777" }}>Sales</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={Colors.mainDark} />
              </View>
            ) : recentBookingsError ? (
              <Text>Something went wrong</Text>
            ) : !recentBookingsData?.success ? (
              <Text>{recentBookingsData?.error}</Text>
            ) : (
              <View style={{ gap: 4 }}>
                {!!recentBookingsData.bookings.length ? (
                  recentBookingsData.bookings.map((booking) => (
                    <BookingCardComponent key={booking.id} booking={booking} />
                  ))
                ) : (
                  <View style={{ padding: 12 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontWeight: "600",
                        fontSize: 25,
                      }}
                    >
                      No Bookings
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
