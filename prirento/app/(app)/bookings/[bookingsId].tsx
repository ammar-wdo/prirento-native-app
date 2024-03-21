import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookingDetailsQuery } from "@/hooks/queries.hook";
import { useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import BookingDetail from "@/components/booking-detail";
import { capitalizer, fetcher, formatDate, timeFromNow } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import BookingDetailCard from "@/components/booking-details-card";
import CustomHeader from "@/components/custom-header";
import { GET_NOTIFICATIONS } from "@/links";
import { useAuth } from "@/hooks/auth.hook";

const Separator = () => (
  <View
    style={{
      borderTopWidth: 0.7,
      borderColor: Colors.border2,
      marginVertical: 10,
    }}
  />
);

const BookingDetails = () => {
  const { bookingsId } = useLocalSearchParams();
  const { data, isLoading, error, refetch } = useBookingDetailsQuery(
    bookingsId as string
  );
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      queryClient.invalidateQueries({
        queryKey: ["bookingDetails", bookingsId],
      });
    } catch (error) {
      console.error("Failed to refetch:", error);
    } finally {
      setRefreshing(false);
    }
  };

const {user} = useAuth()

  useEffect(()=>{
const setRead = async ()=>{
  try {
    const res = await fetcher<{success:boolean,error?:string}>(GET_NOTIFICATIONS + '/' + bookingsId,user?.token)
    console.log('notification responde',res)
    if(res.success){
     queryClient.invalidateQueries({queryKey:['notifications']})
     queryClient.invalidateQueries({queryKey:['notificationsCount']})
    }
  } catch (error) {
    console.log(error)
  }

}

setRead()

  },[bookingsId])

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollViewContent}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.mainDark} />
          </View>
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : !data?.success ? (
          <Text>{data?.error}</Text>
        ) : (
          <ScrollView >
            <CustomHeader />
            <View style={{ width: "100%", aspectRatio: 2 / 1 }}>
              <Image
                source={{ uri: data.bookingDetails.carImage }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.7)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ width: "100%", height: "100%", position: "absolute" }}
              />
              <TouchableOpacity
                onPress={() => router.replace("/(app)/bookings")}
                style={{ position: "absolute", top: 20, left: 20 }}
              >
                <Ionicons size={20} name="arrow-back" color={"white"} />
              </TouchableOpacity>

              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "700" }}
                >
                  {capitalizer(data.bookingDetails.carName)}
                </Text>
                <Text
                  style={{
                    flex: 1,

                    fontWeight: "300",
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  #{data.bookingDetails.bookingCode}
                </Text>
              </View>
            </View>

            {/* bookings details */}
            <View style={{ flex: 1, marginTop: 12, padding: 12 }}>
              <BookingDetailCard title="Driver's Details">
                <BookingDetail
                  title="First name"
                  description={data.bookingDetails.firstName}
                />
                <Separator />
                <BookingDetail
                  title="last name"
                  description={data.bookingDetails.lastName}
                />
                <Separator />
                <BookingDetail
                  title="contact number"
                  description={data.bookingDetails.contactNumber}
                />
                <Separator />
                <BookingDetail
                  title="country"
                  description={data.bookingDetails.countryOfResidance}
                />
              </BookingDetailCard>
              {/* Driver ddetails */}
              <View style={{ marginTop: 25 }}>
                <BookingDetailCard title="Billing details">
                  <BookingDetail
                    title="first name"
                    description={data.bookingDetails.billingFirstName}
                  />
                  <Separator />
                  <BookingDetail
                    title="last name"
                    description={data.bookingDetails.billingLastname}
                  />
                  <Separator />
                  <BookingDetail
                    title="contact number"
                    description={`+${data.bookingDetails.billingContactNumber}`}
                  />
                  <Separator />
                  <BookingDetail
                    title="country"
                    description={data.bookingDetails.billingCountry}
                  />
                  <Separator />
                  <BookingDetail
                    title="city"
                    description={data.bookingDetails.billingCity}
                  />
                  <Separator />
                  <BookingDetail
                    title="address"
                    description={data.bookingDetails.billingAddress}
                  />
                  <Separator />
                  <BookingDetail
                    title="postcode"
                    description={data.bookingDetails.billingZipcode}
                  />
                </BookingDetailCard>
              </View>
              <View style={{ marginTop: 25 }}>
                <BookingDetailCard title="booking details">
                  <BookingDetail
                    title="booking type"
                    description={
                      data.bookingDetails.companyName ? "Business" : "Personal"
                    }
                  />
                  <Separator />
                  <BookingDetail
                    title="booking date"
                    description={timeFromNow(data.bookingDetails.createdAt)}
                  />
                  <Separator />
                  <BookingDetail
                    title="pick-up date"
                    description={formatDate(
                      new Date(data.bookingDetails.startDate)
                    )}
                  />
                  <Separator />
                  <BookingDetail
                    title="drop-off date"
                    description={formatDate(
                      new Date(data.bookingDetails.endDate)
                    )}
                  />
                  <Separator />
                  <BookingDetail
                    title="pick-up location"
                    description={data.bookingDetails.pickupLocation}
                  />
                  <Separator />
                  <BookingDetail
                    title="drop-off date"
                    description={
                      data.bookingDetails.dropoffLocation ||
                      data.bookingDetails.pickupLocation
                    }
                  />
                </BookingDetailCard>
              </View>
              <View style={{ marginTop: 25 }}>
                <BookingDetailCard title="payment details">
                  <BookingDetail
                    title="payment method"
                    description={data.bookingDetails.paymentMethod}
                  />
                  <BookingDetail
                    title="payment status"
                    description={data.bookingDetails.paymentStatus}
                  />
                  <Separator />
                  <BookingDetail
                    title="car rental price"
                    description={data.bookingDetails.subtotal.toFixed(2)}
                    prefix="AED"
                  />
                  <BookingDetail
                    title="reservation fee"
                    description={data.bookingDetails.reservationFee.toFixed(2)}
                    prefix="AED"
                  />
                  <BookingDetail
                    title="refundable deposit"
                    description={data.bookingDetails.deposit.toFixed(2)}
                    prefix="AED"
                  />
                  <Separator />
                  <BookingDetail
                    title="discount"
                    description={data.bookingDetails.discount.toFixed(2)}
                    prefix="AED"
                  />
                  <Separator />
                  <BookingDetail
                    title="delivery fee"
                    description={(data.bookingDetails.deliveryFee || 0).toFixed(
                      2
                    )}
                    prefix="AED"
                  />
                  <Separator />
                  {data.bookingDetails.adminRules.map((rule) => (
                    <BookingDetail
                      key={rule.id}
                      title={rule.label}
                      description={rule.valueToPay.toFixed(2)}
                      prefix="AED"
                    />
                  ))}
                  {!!data.bookingDetails.adminRules.length && <Separator />}
                  {data.bookingDetails.extraOptions.map((option) => (
                    <BookingDetail
                      key={option.id}
                      title={option.label}
                      description={option.price.toFixed(2)}
                      prefix="AED"
                    />
                  ))}

                  {!!data.bookingDetails.extraOptions.length && <Separator />}
                  <BookingDetail
                    title="total amount"
                    description={data.bookingDetails.total.toFixed(2)}
                    prefix="AED"
                  />
                  <Separator />
                  <BookingDetail
                    title="pay now"
                    description={data.bookingDetails.payNow.toFixed(2)}
                    prefix="AED"
                  />
                  <BookingDetail
                    title="pay later"
                    description={data.bookingDetails.payLater.toFixed(2)}
                    prefix="AED"
                  />
                </BookingDetailCard>
              </View>
            </View>
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Ensure the background color covers the entire screen
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1, // Ensure contentContainer grows to fit the screen
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
