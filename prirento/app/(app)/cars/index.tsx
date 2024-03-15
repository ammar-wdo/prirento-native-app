import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "@/components/custom-header";

import CarCardItem from "@/components/car-card";
import { Colors } from "@/constants/Colors";
import { useCarsQuery } from "@/hooks/queries.hook";

const renderItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, refetch: refetchCars } = useCarsQuery();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetchCars();
    } catch (error) {
      console.error("Failed to refetch cars:", error);
      // Handle the error as needed
    } finally {
      setRefreshing(false); // Always stop the refreshing indicator
    }
  };

  return (
    <View style={styles.list}>
      <CustomHeader cars={true} />
      {isLoading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color={Colors.mainDark} />
        </View>
      ) : !data?.success ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{data?.error}</Text>{" "}
        </ScrollView>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.list}
          ItemSeparatorComponent={renderItemSeparator}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          data={data.cars}
          renderItem={({ item }) => <CarCardItem car={item} />}
        />
      )}

      <Text></Text>
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
