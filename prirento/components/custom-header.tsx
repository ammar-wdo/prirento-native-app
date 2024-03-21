import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"; // Using MaterialCommunityIcons for example
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/hooks/auth.hook";
import { Colors } from "@/constants/Colors";
import { useNotificationsCount } from "@/hooks/queries.hook";

const CustomHeader = ({ cars }: { cars?: boolean }) => {
  const { user } = useAuth();

  const { data } = useNotificationsCount();
console.log(data)
const router = useRouter()
  return (
    <View style={styles.container}>
      {/* Account Image and Name Placeholder */}
      <TouchableOpacity  onPress={()=>router.push('/(modals)/personal-info')}>
      <View style={styles.accountContainer}>
        <Image
          style={styles.logo}
          source={{ uri: user?.logo }}
          resizeMode="contain"
          width={35}
          height={35}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.accountName}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      </TouchableOpacity>
  

      {/* Bell Icon for Notifications */}

      <Link asChild href={`/(modals)/notifications`}>
        <TouchableOpacity onPress={() => {}} style={{ position: "relative" }}>
          {!!(data?.success && data.count > 0) && (
           <View
           style={{
             position:'absolute',
             backgroundColor: "red",
             width: 14,
             height: 14,
             alignItems: "center",
             justifyContent: "center",
             borderRadius: 100,
             top:-4,
             right:1,
             zIndex:10
           }}
         >
           <Text style={{color:'white',fontSize:10}}>{data.count}</Text>
         </View>
          )}
            
          <Feather name="bell" size={30} color="#000" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: Colors.border2,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoWrapper: {
    marginLeft: 10,
  },
  accountName: {
    fontWeight: "500",
    textTransform: "capitalize",
  },
  email: {
    fontSize: 12,
    color: "gray",
  },
  logo: {
    borderRadius: 100,
  },
});

export default CustomHeader;
