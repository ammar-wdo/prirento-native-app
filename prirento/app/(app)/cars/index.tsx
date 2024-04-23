import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomHeader from "@/components/custom-header";

import CarCardItem from "@/components/car-card";
import { Colors } from "@/constants/Colors";
import { useCarsQuery } from "@/hooks/queries.hook";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TextFilter from "@/components/text-filter";

const renderItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
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





  const filteredData = useMemo(() => data?.cars.filter((el) => {
    if (!query) return true;
    return el.carName.toLowerCase().includes(query.toLowerCase());
  }), [query, data?.cars]);

  // Memoizing onChangeText handler to avoid re-creating the function on every render
  const handleQueryChange = useCallback((text:string) => {
    setQuery(text);
  }, []);


const router = useRouter()
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
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>{data?.error}</Text>{" "}
        </ScrollView>
      ) : (
        <View style={{flex:1,backgroundColor:'white'}}>
         
        <FlatList
     
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={()=>  <TextFilter placeHolder="Search By Car Model" text={query} setText={handleQueryChange} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.list}
          ItemSeparatorComponent={renderItemSeparator}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          data={filteredData}
          renderItem={({ item }) => <CarCardItem car={item} />}
          ListEmptyComponent={
            !isLoading && (
              <Text style={styles.emptyListText}>No such car</Text>
            )
          }
        />
        </View>
      
      )}

 
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
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});
