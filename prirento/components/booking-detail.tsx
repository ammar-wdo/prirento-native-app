import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  title: string;
  description: string;
  prefix?: string;
};
const BookingDetail = ({ title, description, prefix }: Props) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" ,padding:5}}>
      <Text style={{ textTransform: "capitalize", fontWeight: "500" }}>
        {title}
      </Text>
      <Text style={{ color: "gray", textTransform: "capitalize" }}>
        {prefix && <Text style={{ textTransform: "uppercase" }}>{prefix}</Text>}{" "}
        {description}
      </Text>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({});
