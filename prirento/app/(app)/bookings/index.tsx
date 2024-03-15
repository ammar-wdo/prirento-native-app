import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingsQuery } from "@/hooks/queries.hook";
import { useQueryClient } from "@tanstack/react-query";
import CustomHeader from "@/components/custom-header";

import { Ionicons } from "@expo/vector-icons";
import BookingCardComponent from "@/components/bookings-card";
import { Colors } from "@/constants/Colors";

const renderItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const clientQuery = useQueryClient();

  const {
    data: BookingsData,
    isLoading: BookingsLoading,
    error: BookingsError,
    refetch: BookingsRefetch,
  } = useBookingsQuery();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([BookingsRefetch()]);
      clientQuery.invalidateQueries({ queryKey: ["bookings"] });
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View style={{ flex: 1,backgroundColor:'white'  }}>
      <CustomHeader />

      <View
        style={{
          marginTop: 4,
        backgroundColor:'white',
          flex:1,
          padding:12
         
        }}
      >
        <View
          style={{
            borderColor: Colors.border2,
            borderWidth: 0.7,
            flexDirection:'row',
            alignItems:'center',
            gap:5,
            padding:5,
            borderRadius:6

         
          }}
        >
          <Ionicons name="car-sport-outline" size={30} color={"gray"} />
          <Text style={{ color: "gray", fontSize: 16 }}>Bookings</Text>
        </View>
        <View style={{flex:1}}>
          {BookingsLoading ? (
            <Text>Loading bookings...</Text>
          ) : BookingsError ? (
            <Text>Something went wrong</Text>
          ) : !BookingsData?.success ? (
            <Text>{BookingsData?.error}</Text>
          ) : (
            <View style={{ gap: 4,flex:1,}}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={styles.list}
                ItemSeparatorComponent={renderItemSeparator}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContentContainer}
                data={BookingsData.bookings}
                renderItem={({ item }) => (
                  <BookingCardComponent booking={item} />
                )}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
  itemSeparator: {
    height: 20,
  },
  listContentContainer: {
  
    paddingTop: 10,
  },
});
