import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  label?: string;
  value: string;
  numeric?: boolean;
  setValue: (value: string) => void;
  onBlur?:()=>void
};
const Input = ({ value, setValue, label, numeric,onBlur }: Props) => {
  return (
    <View style={{ gap: 12 }}>
      {!!label && (
        <Text style={{ fontWeight: "700", textTransform: "capitalize" }}>
          {label}
        </Text>
      )}
      <TextInput
      onBlur={onBlur}
        value={value}
        onChangeText={setValue}
        style={{
          padding: 10,
          borderWidth: 0.7,
          borderColor: Colors.border2,
          borderRadius: 5,
        }}
        keyboardType={numeric ? "numeric" : "default"}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
