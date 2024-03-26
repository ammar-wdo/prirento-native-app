import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { carAvailabilitySchema, carExtraOptionsSchema } from "@/schemas";

import { CarAvailability, ExtraOption } from "@/types";
import { convertDateToISOString, fetcher, getTime, poster } from "@/lib/utils";
import {
  GET_CAR_AVAILABILITIES,
  GET_CAR_AVAILABILITIES_DETAILS,
  GET_CAR_EXTRA_OPTIONS,
  GET_CAR_EXTRA_OPTIONS_DETAILS,
} from "@/links";
import { useAuth } from "./auth.hook";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "./modal-hook";

export const useCarAvailability = (
  carAvailability: CarAvailability | undefined,
  carId: string
) => {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof carAvailabilitySchema>>({
    resolver: zodResolver(carAvailabilitySchema),
    defaultValues: {
      label: carAvailability?.label || "",
      startDate:convertDateToISOString(new Date(carAvailability?.startDate || '')),
      endDate: convertDateToISOString(new Date(carAvailability?.endDate || '')),
      startTime: getTime(new Date(carAvailability?.startDate || "")) || "",
      endTime: getTime(new Date(carAvailability?.endDate || "")) || "",
    },
  });
  const router = useRouter();

  const { setAvailability } = useModal();
  const queryClient = useQueryClient();
  async function onSubmit(values: z.infer<typeof carAvailabilitySchema>) {
    try {

        
      let res;

      if (carAvailability) {
        res = await poster<{ success: boolean; error?: string }>(
          GET_CAR_AVAILABILITIES_DETAILS(carId, carAvailability.id),
          values,
          user?.token
        );
      } else {
        res = await poster<{ success: boolean; error?: string }>(
          GET_CAR_AVAILABILITIES(carId),
          values,
          user?.token
        );
      }
      console.log("res", res);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["availability", carId] });
        setAvailability(false);
        Alert.alert(
          carAvailability ? "Successfully Updated" : "Successfully Created"
        );
      } else if (res.error) {
        Alert.alert(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    form,
    onSubmit,
  };
};
