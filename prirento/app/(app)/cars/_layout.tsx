import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import CustomHeader from '@/components/custom-header'

export default function _layout() {
  return (
    <> 
    <CustomHeader cars={true} />
    <Stack initialRouteName='index'>
    <Stack.Screen name='index' options={{headerShown:false}} />
  
    <Stack.Screen name='[carId]' options={{headerShown:false}}/>
    </Stack>
    </>
  )
}

const styles = StyleSheet.create({})