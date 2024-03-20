import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ExtraOption } from '@/types'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

type Props = {
    el:ExtraOption,
    carId:string
}
const ExtraOptionCard = ({el,carId}:Props) => {
    const router = useRouter()
  return (
    <View

    style={{
      borderWidth: 0.7,
      borderColor: Colors.border2,
      borderRadius: 5,
      padding: 8,
      marginBottom: 12,
    }}
  >
    <Image
      source={{ uri: el.logo }}
      style={{ width: "100%", aspectRatio: 2 / 1, borderRadius: 5 }}
      resizeMode="contain"
    />
    <View style={{flexDirection:'row',flex:1,marginTop:12,gap:12,alignItems:'flex-end'}}>
        <View>
        <Text style={{ textTransform: "capitalize", fontWeight: "700" ,fontSize:15}}>
        {el.label}
      </Text>
     
      <Text style={{ color: "gray", textTransform: "capitalize" }}>
        <Text style={{ textTransform: "uppercase" }}>AED</Text>{" "}
        {el.price.toFixed(2)}
      </Text>
        </View>
     <View style={el.status==='active' ? styles.active : styles.pending}>
     <Text style={{textTransform: "capitalize" ,color:'white',fontSize:10}}>
        {el.status}
      </Text>
     </View>
    
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: Colors.secondaryGreen,
          borderRadius: 5,
          padding: 8,
          flex:1
        }}
        onPress={() => {
router.push(`/(app)/cars/${carId}/carDetails/extraOptions/${el.id}`)

        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default ExtraOptionCard

const styles = StyleSheet.create({
    active:{
      backgroundColor:Colors.secondaryGreen,
      color:'white',
      paddingVertical:3,
      paddingHorizontal:12,
      borderRadius:100,
      
    },
    pending:{
      backgroundColor:'orange',
      color:'white',
      paddingVertical:3,
      paddingHorizontal:12,
      borderRadius:100,
 
    }
  });