import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
    label?:string
  value: string;
  setValue: (value: string) => void;
};
const Input = ({ value, setValue,label }: Props) => {
  return <View style={{gap:2}}>
    {label && <Text style={{fontWeight:'800',textTransform:'capitalize'}}>{label}</Text>}
    <TextInput value={value} onChangeText={setValue} 
  style={{padding:10,borderWidth:1,borderColor:Colors.border,borderRadius:10}}
  /></View>;
};

export default Input;

const styles = StyleSheet.create({});
