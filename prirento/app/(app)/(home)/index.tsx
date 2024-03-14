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
  useRecentBookingsQuery,
  useRecentCarsQuery,
} from "@/hooks/queries.hook";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import RecentCarCard from "@/components/recent-car-card";
import { Colors } from "@/constants/Colors";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

import BookingCardComponent from "@/components/bookings-card";

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
    refetch:recentBookingsRefetch
  } = useRecentBookingsQuery();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([recentBookingsRefetch(),recentRefetch()]) ;
      clientQuery.invalidateQueries({ queryKey: ["recentCars"] });
      clientQuery.invalidateQueries({ queryKey: ["recentBookings"] });
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ fontWeight: "700",fontSize:18 }}>Most Rented Cars</Text>
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
          style={{ marginTop: 40, borderColor: Colors.border2, borderWidth: 0.7 , borderRadius:6}}
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
            <Text style={{ color: "gray" ,fontSize:16}}>Latest Bookings</Text>
          </View>
          <View >
            {recentBookingsLoading ? <Text>Loading bookings...</Text>
             : recentBookingsError ? <Text>Something went wrong</Text>
             : !recentBookingsData?.success ? <Text>{recentBookingsData?.error}</Text>
             :<View style={{gap:4}}>
              {recentBookingsData.bookings.map(booking=><BookingCardComponent key={booking.id} booking={booking} />)}
             </View>
          }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
