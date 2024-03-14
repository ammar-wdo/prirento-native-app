import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BookingCard } from "@/types";
import { Colors } from "@/constants/Colors";
import { timeFromNow } from "@/lib/utils";


type Props = {
  booking: BookingCard;
};
const BookingCardComponent = ({ booking }: Props) => {


const time = timeFromNow(booking.createdAt)

  return (
    <View style={{flexDirection:'row',gap:14,padding:12,borderBottomColor:Colors.border,borderBottomWidth:0.7}}>
      {/* image */}

      <View style={{ width: 80 }}>
        <Image
          style={{ width: "100%", aspectRatio: 3 / 2, borderRadius: 6 }}
          source={{ uri: booking.carImage }}
        />
      </View>

      {/* info */}

      <View>
        <Text
          style={{
           marginTop:-3,
            fontSize: 19,
            textTransform: "capitalize",
          }}
        >
          {booking.name}
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 12,
            textTransform: "capitalize",
            color:'gray',
            marginTop:5

          }}
        >
          {booking.carName}
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 12,
            textTransform: "capitalize",
            color:'gray',
            marginTop:5

          }}
        >
          #{booking.bookingCode}
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 12,
            textTransform: "capitalize",
            color:'gray',
            marginTop:5

          }}
        >
          Pick-up Location:{booking.pickupLocation}
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 12,
            textTransform: "capitalize",
            color:'gray',
            marginTop:3

          }}
        >
          Drop-off Location: {booking.dropoffLocation || booking.pickupLocation}
        </Text>
      </View>

      {/* total and date */}
      <View style={{marginLeft:'auto'}}>
        <Text style={{fontSize:14,fontWeight:'500'}}>AED {booking.total.toFixed(2)}</Text>
        <Text style={{fontSize:10,color:'gray',marginLeft:'auto',marginTop:5}}>{time}</Text>
      
      </View>
    </View>
  );
};

export default BookingCardComponent;

const styles = StyleSheet.create({});
