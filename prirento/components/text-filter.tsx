import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";

type Props = {
  text: string;
  setText: (val: string) => void;
  placeHolder:string
};
const TextFilter = ({ text, setText,placeHolder }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    register("search");
  }, [register]);

  return (
    <View style={{ marginTop: 10, marginBottom: 20 }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 10,
            borderRadius: 100,
            backgroundColor: Colors.lightGray,
          }}
        >
          <Ionicons name="arrow-back" size={20} />
        </TouchableOpacity>

        <View
          style={{
            borderWidth: 0.7,
            borderRadius: 100,
            borderColor: Colors.border2,
            flex: 1,
            padding: 6,
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Ionicons name="search" />
          <TextInput
            onChangeText={(text) => setValue("search", text)}
            style={{ flex: 1 }}
            placeholder={placeHolder}
          />

          <TouchableOpacity onPress={() => setText(watch("search"))}>
            <Text style={{fontWeight:'600'}}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!!text && (
        <TouchableOpacity
        onPress={()=>setText('')}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderWidth: 0.5,
            borderColor: Colors.border2,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 8,
            alignSelf: "flex-start",
            marginTop: 8,
          }}
        >
          <Text style={{ textTransform: "uppercase", fontWeight: "700" }}>
            {text}
          </Text>
          <Ionicons name="close" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextFilter;

const styles = StyleSheet.create({});
