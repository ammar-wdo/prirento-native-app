import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _layout() {
  return (

    <Stack>
    <Stack.Screen name='index' options={{headerShown:false}}/>
    <Stack.Screen name='notifications' options={{headerTitleAlign:'center',headerBackTitleVisible:false}} />
    </Stack>

  )
}

const styles = StyleSheet.create({})