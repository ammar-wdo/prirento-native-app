import { CarDetail, ComingCar, carSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, Platform } from "react-native";
import { string, z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poster } from "@/lib/utils";
import { useAuth } from "./auth.hook";
import { url } from "./queries.hook";
import { ToastAndroid } from "react-native";
import { useState } from "react";

export const useAddCar = () => {


  const [refreshing, setRefreshing] = useState(false);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [isInteriorColorPickerVisible, setInteriorColorPickerVisible] =
    useState(false);

  const [isModelPickerVisible, setModelPickerVisible] = useState(false);
  const [isTrasmissionPickerVisible, setTransmissionPickerVisible] =
    useState(false);
  const [isElectricPickerVisible, setElectricPickerVisible] = useState(false);
  const [isCarTypePickerVisible, setCarTypePickerVisible] = useState(false);

  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      additionalFeatures: [],
      carModelId: "",

      carType:  "SUV",
      colors:"Beige",

      coolDown:  undefined,
      deleviryFee:  undefined,
      deposite: undefined,
      description:  "",
      disabled:  false,
      doors:  undefined,
      electric: "fully_electric",
      engine: "",
      gallary:  [],
      interiorColor:"Beige",
      kmIncluded:undefined,
      minimumHours:  undefined,

      seats: undefined,
      transmition:  "auto",
      year:  "",
      pickupLocations: [],
      dropoffLocations: [],
    },
  });

  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();


  const onSubmit = async (data: z.infer<typeof carSchema>) => {
    try {
      const res = await poster<{ success: boolean; message?: string }>(
        `${url}/api/native/car`,
        data,
        user?.token
      );

      if (!res.success) {
        Alert.alert(res.message || "error");
      } else {
        Alert.alert("Successfully Created");
        queryClient.invalidateQueries({ queryKey: ["cars"], exact: true });
     
        router.push('/(app)/cars');
      }
    } catch (error) {
      console.warn(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return {
    form,
    onSubmit,
    refreshing,
    setRefreshing,
    isColorPickerVisible,
    setColorPickerVisible,
    isInteriorColorPickerVisible,
    setInteriorColorPickerVisible,
    isModelPickerVisible, setModelPickerVisible,
    isTrasmissionPickerVisible, setTransmissionPickerVisible,
    isElectricPickerVisible, setElectricPickerVisible,
    isCarTypePickerVisible, setCarTypePickerVisible
  };
};
