import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingsQuery } from "@/hooks/queries.hook";
import { useQueryClient } from "@tanstack/react-query";
import CustomHeader from "@/components/custom-header";

import { Ionicons } from "@expo/vector-icons";
import BookingCardComponent from "@/components/bookings-card";
import { Colors } from "@/constants/Colors";
import Input from "@/components/Input";
import { useRouter } from "expo-router";

const renderItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const clientQuery = useQueryClient();
  const [query, setQuery] = useState("");

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

  const filteredData = useMemo(() => {
    return BookingsData?.bookings.filter((el) => {
      if (!query) return true;
      return el.bookingCode.includes(query);
    });
  }, [query, BookingsData?.bookings]);
const router = useRouter()
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />

      <View
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <View
          style={{
            margin: 10,
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Ionicons name="arrow-back" size={20} onPress={()=>router.push('/(app)/(home)')}/>
          <View
            style={{
              borderWidth: 0.7,
              borderRadius: 100,
              borderColor: Colors.border2,
              flex: 1,
              padding: 6,
              paddingHorizontal:14,
              flexDirection: "row",
              alignItems:'center',
              gap:4
            }}
          >
            <Ionicons name="search" />
            <TextInput
              value={query}
              onChangeText={(text) => setQuery(text)}
              style={{ flex: 1 }}
              placeholder="Search by booking code"
            />
          </View>
        </View>
        <View
          style={{
            borderColor: Colors.border2,
            borderWidth: 0.7,
            flex: 1,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              borderColor: Colors.border2,
              borderBottomWidth: 0.7,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 5,
            }}
          >
            <Ionicons name="car-sport-outline" size={30} color={"gray"} />
            <Text style={{ color: "gray", fontSize: 16 }}>Bookings</Text>
          </View>

          <View style={{ flex: 1 }}>
            {BookingsLoading ? (
              <View style={{   flex: 1,
                justifyContent: "center",
                alignItems: "center",}}>
              <ActivityIndicator size="large" color={Colors.mainDark} />
            </View>
            ) : BookingsError ? (
              <Text>Something went wrong</Text>
            ) : !BookingsData?.success ? (
              <Text>{BookingsData?.error}</Text>
            ) : (
              <View style={{ gap: 4, flex: 1 }}>
                <FlatList
                    ListEmptyComponent={
                      !BookingsLoading && (
                        <Text style={styles.emptyListText}>No such booking</Text>
                      )
                    }
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
                  data={filteredData}
                  renderItem={({ item }) => (
                    <BookingCardComponent booking={item} />
                  )}
                />
              </View>
            )}
          </View>
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
    backgroundColor: "white",
    paddingTop: 10,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});
