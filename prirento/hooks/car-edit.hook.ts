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

export const useCarEdit = (car: ComingCar | undefined) => {
  const usedPickups = car?.pickupLocations.map((el) => el.id);
  const usedDropoffs = car?.dropoffLocations.map((el) => el.id);

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
      additionalFeatures: (car?.additionalFeatures || []) as {
        title: string;
        icon: string;
      }[],
      carModelId: car?.carModelId || "",

      carType: car?.carType || "SUV",
      colors: car?.colors || "Beige",

      coolDown: car?.coolDown || undefined,
      deleviryFee: car?.deleviryFee || undefined,
      deposite: car?.deposite || undefined,
      description: car?.description || "",
      disabled: car?.disabled || false,
      doors: car?.doors || undefined,
      electric: car?.electric || "fully_electric",
      engine: car?.engine || "",
      gallary: car?.gallary || [],
      interiorColor: car?.interiorColor || "Beige",
      kmIncluded: car?.kmIncluded || undefined,
      minimumHours: car?.minimumHours || undefined,

      seats: car?.seats || undefined,
      transmition: car?.transmition || "auto",
      year: car?.year || "",
      pickupLocations: usedPickups,
      dropoffLocations: usedDropoffs,
    },
  });

  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { carId } = useLocalSearchParams();

  const onSubmit = async (data: z.infer<typeof carSchema>) => {
    try {
      const res = await poster<{ success: boolean; message?: string }>(
        `${url}/api/native/car/${carId}/edit`,
        data,
        user?.token
      );

      if (!res.success) {
        Alert.alert(res.message || "error");
      } else {
        Alert.alert("Successfully Updated");
        queryClient.invalidateQueries({ queryKey: ["cars"], exact: true });
        queryClient.invalidateQueries({
          queryKey: ["carDetails", carId],
          exact: true,
        });
        router.back();
      }
    } catch (error) {
      console.warn(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return {
    form,
    onSubmit,
    usedPickups,
    usedDropoffs,
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
