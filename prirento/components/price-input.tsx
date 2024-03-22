import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

type Props = {
  index: string;
  value: string;
  numeric?: boolean;
  setValue: (value: number, i: number) => void;
  deleteRow: (value: number) => void;
};

const PriceInput = ({ value, setValue, numeric, index, deleteRow }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 10,
      }}
    >
      <Text style={{ flex: 1 }}>
        {+index + 1} {index === (0).toString() ? "Day" : "Days"}
      </Text>
      <TextInput
      
        value={value || ""}
        onChangeText={(e) => setValue(+e, +index)}
        style={{
          padding: 10,
          borderWidth: 0.7,
          borderColor: Colors.border2,
          borderRadius: 5,
          width: 210,
        }}
        keyboardType={numeric ? "numeric" : "default"}
        placeholder="0"
        
      />
      <TouchableOpacity   onPress={() => deleteRow(+index)}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.lightGray,
          padding: 12,
          borderRadius: 6,
        }}
      >
        <Feather
          name="trash"
          color={"gray"}
        
        />
      </View>
      </TouchableOpacity>
    
    </View>
  );
};

export default PriceInput;

const styles = StyleSheet.create({});
