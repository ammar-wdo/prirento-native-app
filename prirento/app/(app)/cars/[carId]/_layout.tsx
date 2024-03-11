import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Slot, Stack, useLocalSearchParams, useRouter } from 'expo-router'


import { Colors } from '@/constants/Colors';
import CustomHeader from '@/components/custom-header';
import { Ionicons } from '@expo/vector-icons';
import { CarDetail } from '@/schemas';
import { useCarQuery } from '@/hooks/queries.hook';

const _layout = () => {
    const { carId } = useLocalSearchParams();
    const router = useRouter()

  const {isLoading,data} = useCarQuery(carId as string)

      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={Colors.mainDark} />
          </View>
        );
      }
      if (!data?.success) return <Text>{data?.error}</Text>;

  return (
    <SafeAreaView style={{flex:1}}>
         <CustomHeader cars={true} />
         <View style={{position:'relative'}}>
         <Image source={{uri:data.car.gallary[0]}}  style={{aspectRatio:2/1,width:'100%'}} />
         <TouchableOpacity onPress={()=>router.push('/(app)/cars')} style={{position:'absolute',top:20,left:10}}>
            <Ionicons name='arrow-back' size={20} color={'white'}/>
         </TouchableOpacity>
         </View>
 
        

 
    <Slot />
    </SafeAreaView>

  )
}

export default _layout

const styles = StyleSheet.create({})