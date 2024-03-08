import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Colors } from '@/constants/Colors'

const FormWrapper = ({children,title}:{children:ReactNode,title:string}) => {
  return (
    <View style={{borderColor:Colors.border,borderWidth:1,borderRadius:10,padding:14}}>
      <Text style={{fontWeight:'800',fontSize:20}}>{title}</Text>
      <View style={{marginTop:12}}>
        {children}
      </View>
    </View>
  )
}

export default FormWrapper

const styles = StyleSheet.create({})