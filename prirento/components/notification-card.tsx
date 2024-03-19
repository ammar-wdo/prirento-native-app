import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Notification } from '@/types'
import { Colors } from '@/constants/Colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { timeFromNow } from '@/lib/utils'
import { useRouter } from 'expo-router'



const NotificationCard = ({item}:{item:Notification}) => {
    const router = useRouter()
  return (
    <TouchableOpacity onPress={()=>router.replace(`/(app)/bookings/${item.booking.id}`)}>
    <View
    style={{
      flexDirection: "row",
      gap: 20,
      alignItems: "flex-start",
      padding: 12,
      backgroundColor: !!item.isRead
        ? "white"
        : Colors.lightBackground,
    }}
  >
    <View>
      {item.type === "BOOKING" ? (
        <AntDesign name="checkcircle" color={"green"} size={25} />
      ) : (
        <MaterialIcons name="error" color={"red"} />
      )}
    </View>
    <View style={{ gap: 12, flex: 1 }}>
      <Text style={{ fontWeight: "600" }}>
        {item.type === "BOOKING"
          ? "New booking has been bade"
          : "Booking has been canceled"}
      </Text>
      <Text style={{ color: "gray" }}>
        {item.message}{" "}
        <Text
          style={{ fontWeight: "700", textTransform: "capitalize" }}
        >
          {item.carName}
        </Text>
      </Text>
      <Text style={{ color: Colors.mainDark, fontWeight: "600" }}>
        Check Booking
      </Text>
    </View>
    <View>
      <Text style={{ fontSize: 10, color: "gray" }}>
        {timeFromNow(item.createdAt)}
      </Text>
    </View>
  </View>
    </TouchableOpacity>

  )
}

export default NotificationCard

const styles = StyleSheet.create({})