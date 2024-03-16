import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "@/constants/Colors";
type Props = {
  title: string;
  children: ReactNode;
};
const BookingDetailCard = ({ children, title }: Props) => {
  return (
    <View style={{borderWidth:0.7,borderColor:Colors.border2,borderRadius:12,overflow:'hidden'}}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 20,
          textTransform: "capitalize",
          paddingVertical: 20,
          paddingHorizontal:10,
          backgroundColor: Colors.secondaryGreen,
          color: "white",
        }}
      >
        {title}
      </Text>
      <View style={{ marginTop: 12,paddingHorizontal:8,paddingBottom:8}}>{children}</View>
    </View>
  );
};

export default BookingDetailCard;

const styles = StyleSheet.create({});
