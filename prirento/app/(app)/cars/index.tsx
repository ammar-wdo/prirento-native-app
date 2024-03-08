import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CustomHeader from "@/components/custom-header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomQuery } from "@/hooks/custom-query.hook";
import { CarCard } from "@/types";


import CarCardItem from "@/components/car-card";

const renderItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const index = () => {
  const { data, isLoading, error } = useCustomQuery<{
    success: boolean;
    cars: CarCard[];
    error?: string;
  }>("cars", "http://10.0.2.2:3001/api/native/cars");
  console.log("data", data);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (!data?.success) return <Text>{data?.error}</Text>;

  return (
    <View style={styles.list}>
      <CustomHeader cars={true} />
      <FlatList
      style={styles.list}
        ItemSeparatorComponent={renderItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContentContainer}
        data={data.cars}
        renderItem={({ item }) => (
       <CarCardItem car={item}   />
        )}
      />

      <Text></Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width:'100%'
  
  },
  itemSeparator: {
    height: 20,
  },
  listContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
