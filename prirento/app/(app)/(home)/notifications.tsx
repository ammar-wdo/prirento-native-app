import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Notifications() {
  return (
    <SafeAreaView edges={['bottom']}>
      <Text>notifications</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})