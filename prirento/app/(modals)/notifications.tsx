import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNotifications } from "@/hooks/queries.hook";
import { Colors } from "@/constants/Colors";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { it } from "node:test";
import { timeFromNow } from "@/lib/utils";
import NotificationCard from "@/components/notification-card";
import ErrorComponent from "@/components/error-component";
import { useAuth } from "@/hooks/auth.hook";
import LogoutComponent from "@/components/logout-component";

const renderItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const Notifications = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, data, error, refetch } = useNotifications();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.error("Failed to refetch cars:", error);
      // Handle the error as needed
    } finally {
      setRefreshing(false); // Always stop the refreshing indicator
    }
  };

  const {signout} = useAuth()

  if(!data?.success && !!data?.logout) return <LogoutComponent />

  return (
    <View style={styles.list}>
      {isLoading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color={Colors.mainDark} />
        </View>
      ) : !data?.success || error ? (
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ErrorComponent
          text="Something went wrong!"
          onRefresh={onRefresh}
        />
      </ScrollView>
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.list}
            ItemSeparatorComponent={renderItemSeparator}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContentContainer}
            data={data.notifications}
            renderItem={({ item }) => (
            <NotificationCard item={item}/>
            )}
            ListEmptyComponent={
              !isLoading && (
                <Text style={styles.emptyListText}>No Notifications</Text>
              )
            }
          />
        </View>
      )}

  
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
  itemSeparator: {
   borderBottomWidth:0.7,
   borderColor:Colors.border2
  },
  listContentContainer: {
  
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});
