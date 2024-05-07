import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'


type Props = {
    onRefresh:()=>void,
    
    text:string
}
const ErrorComponent = ({onRefresh,text}:Props) => {
  return (
    <>
      <Text>{text}</Text>
     <TouchableOpacity onPress={onRefresh}  style={{
            marginTop: 12,
            backgroundColor: Colors.mainDark,
            padding: 8,
            borderRadius: 5,
          }}>
    <Text style={{color:'white'}}>Try agian!</Text> 
     </TouchableOpacity>
    </>
  )
}

export default ErrorComponent

const styles = StyleSheet.create({})