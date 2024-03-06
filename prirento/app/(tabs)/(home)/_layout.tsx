import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
    <Stack.Screen name='index' />
    <Stack.Screen name='notifications' />
    </Stack>
  )
}

const styles = StyleSheet.create({})