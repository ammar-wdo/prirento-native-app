import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CarCard } from "@/types"; // Ensure this import path is correct
import { Link, useRouter } from "expo-router";

const CarCardItem = ({ car }: { car: CarCard }) => {
  // Make sure status keys are all lowercase if that's how they're defined in your CarCard type
  const statusMapper = {
    Available: styles.available,
    Booked: styles.booked,
    Blocked: styles.blocked,
  };
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/(app)/cars/${car.id}/carDetails`)}>
      <View>
        <Image
          source={{ uri: car.image }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.wrapper}>
          <View style={styles.nameAndYear}>
            <Text style={styles.name}>{car.carName}</Text>
            <Text style={styles.year}>{car.year}</Text>
          </View>
          {/* Corrected style application syntax */}
        { !!car.isPending ? <View style={[styles.statusContainer, {backgroundColor:'orange'}]}><Text style={styles.status}>Pending</Text></View> :  <View style={[styles.statusContainer, statusMapper[car.status]]}>
            <Text style={styles.status}>{car.status}</Text>
          </View>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarCardItem;

const styles = StyleSheet.create({
  image: { width: "100%", aspectRatio: 2 / 1, borderRadius: 15 },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  nameAndYear: { flexDirection: "column", gap: 2 },
  name: { fontWeight: "600", textTransform: "capitalize" },
  year: { color: "gray", fontSize: 12 },
  available: {
    backgroundColor: "green",
  },
  booked: {
    backgroundColor: "orange",
  },
  blocked: {
    backgroundColor: "red",
  },
  statusContainer: {
    alignSelf: "flex-start",
    borderRadius: 100,
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    color: "white",
    textTransform: "capitalize",
  },
});
