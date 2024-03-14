import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

type Props = {
  car:{id:string,
    carName:string,
    carImage:string,
    bookingsCount:number}  
}
const RecentCarCard = ({car}:Props) => {
    const router = useRouter()
  return (
    <TouchableOpacity onPress={()=>router.push(`/(app)/cars/${car.id}/carDetails`)} style={{width:200,borderRadius:7,overflow:'hidden'}}>
      <Image resizeMode='cover' source={{uri:car.carImage}} style={{width:'100%',aspectRatio:2/1.4,borderRadius:7}} />
      <View style={{marginTop:12}}>
<Text style={{fontWeight:'500',textTransform:'capitalize'}}>{car.carName}</Text>
<Text style={{fontSize:11,color:'#777'}}>Booked {car.bookingsCount} {car.bookingsCount > 1 ? 'times' : 'time'} for this month 🔥 </Text>
      </View>
    </TouchableOpacity>
  )
}

export default RecentCarCard

const styles = StyleSheet.create({})