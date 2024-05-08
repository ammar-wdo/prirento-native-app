import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/auth.hook'
import { Colors } from '@/constants/Colors'

const LogoutComponent = () => {

    const { logUserOut } = useAuth()
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',gap:6,backgroundColor:'white'}}>
      <Text style={{fontWeight:'700'}}>Your Email has been changed</Text>
      <Text>Please sign in aging </Text>
      <TouchableOpacity onPress={logUserOut} style={{backgroundColor:Colors.mainDark,padding:12,paddingHorizontal:20 ,borderRadius:5}}>
        <Text style={{color:'white'}}>Sign in </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogoutComponent