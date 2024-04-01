import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingsQuery } from "@/hooks/queries.hook";
import { useQueryClient } from "@tanstack/react-query";
import CustomHeader from "@/components/custom-header";

import { Ionicons } from "@expo/vector-icons";
import BookingCardComponent from "@/components/bookings-card";
import { Colors } from "@/constants/Colors";
import Input from "@/components/Input";
import { useRouter } from "expo-router";
import TextFilter from "@/components/text-filter";

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
  const handleQueryChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const filteredData = useMemo(() => {
    return BookingsData?.bookings.filter((el) => {
      if (!query) return true;
      return el.bookingCode.includes(query);
    });
  }, [query, BookingsData?.bookings]);
  const router = useRouter();
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
            borderColor: Colors.border2,
            borderWidth: 0.7,
            flex: 1,
            borderRadius: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            {BookingsLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={Colors.mainDark} />
              </View>
            ) : !!BookingsError ? (
              <Text>Something went wrong</Text>
            ) : !BookingsData?.success ? (
              <Text>{BookingsData?.error}</Text>
            ) : (
              <View style={{ gap: 4, flex: 1 }}>
                <FlatList
                  ListHeaderComponent={() => (
                    <View>
                      <View style={{ paddingHorizontal: 8 }}>
                        <TextFilter
                          placeHolder="Search By Booking Code"
                          text={query}
                          setText={handleQueryChange}
                        />
                      </View>
                      <View
                        style={{
                          borderColor: Colors.border2,
                          borderBottomWidth: 0.7,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                          padding: 12,
                        }}
                      >
                        <Ionicons
                          name="car-sport-outline"
                          size={30}
                          color={"gray"}
                        />
                        <Text style={{ color: "gray", fontSize: 16 }}>
                          Bookings
                        </Text>
                      </View>
                    </View>
                  )}
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
    color: "gray",
  },
});
