import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/custom-header'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView>
      <CustomHeader cars={true}/>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})