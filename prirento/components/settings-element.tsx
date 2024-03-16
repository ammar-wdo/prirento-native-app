import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'


type Props = {
    title:string,
    push:()=>void
}
const SettingsElement = ({title,push}:Props) => {
  return (
    <TouchableOpacity onPress={push} style={{padding:18}}>
           <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <Text style={{fontWeight:'500',textTransform:'capitalize',fontSize:16}}>{title}</Text>
      <Ionicons name='chevron-forward' size={20}/>
    </View>
    </TouchableOpacity>
 
  )
}

export default SettingsElement

const styles = StyleSheet.create({})