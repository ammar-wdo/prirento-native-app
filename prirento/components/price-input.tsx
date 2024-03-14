import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';



type Props = {
    index:string
  value: string ;
  numeric?:boolean
  setValue: (value: number,i:number) => void;
  deleteRow:(value:number)=>void
};

const PriceInput = ({ value, setValue ,numeric,index,deleteRow}: Props) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',gap:12,marginBottom:10}}>
        <Text style={{flex:1}}>{+index + 1}  {(index === (0).toString()) ? 'Day' : 'Days'}</Text>
       <TextInput value={value || ''} onChangeText={(e)=>setValue(+e,+index)} 
  style={{padding:10,borderWidth:1,borderColor:Colors.border,borderRadius:10,width:210}}
  keyboardType={numeric ? 'numeric' : 'default'}
  placeholder='0'
  />
  <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#777',padding:12,borderRadius:6}}>
  <Feather name='trash' color={'white'} onPress={()=>deleteRow(+index)}/>
  </View>
 
    </View>
  )
}

export default PriceInput

const styles = StyleSheet.create({})