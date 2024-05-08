"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { carPricingsSchema } from "@/schemas";
import { usePathname, useRouter } from "expo-router";
import { Alert } from "react-native";
import { poster } from "@/lib/utils";
import { url } from "./queries.hook";
import { useAuth } from "./auth.hook";
import { useQueryClient } from "@tanstack/react-query";
import { ADD_PRICE } from "@/links";



type Props = {
  success:boolean | undefined
  pricings: number[];
  hourPrice: number | null;

};

export const usePricings = ({ pricings, hourPrice,success}: Props) => {
  const form = useForm<z.infer<typeof carPricingsSchema>>({
    resolver: zodResolver(carPricingsSchema),
    defaultValues: {
      pricings: pricings,
      hourPrice: hourPrice || undefined,
    },
  });

  useEffect(() => {
 if(!success) return

      const requiredLength = 14;
      const arrayLength = form.getValues("pricings")?.length || 0

      if (arrayLength >= requiredLength) return;

      const remainigLength = requiredLength - arrayLength;
      const remainigArray = Array(remainigLength).fill(0);

      const newArray = [...form.getValues("pricings") || [], ...remainigArray];

      form.setValue("pricings", newArray);
    
  }, [success]);

  const router = useRouter()

  const {user , logUserOut} = useAuth()

  const queryClient = useQueryClient()

  const pathname = usePathname();
  const carId = pathname.split("/")[2];

  async function onSubmit(values: z.infer<typeof carPricingsSchema>) {
    try {
   
      const res = await poster<{ success: boolean; message?: string,logout?:boolean }>(
        ADD_PRICE(carId as string),
        values,
        user?.token
      );
      if(!res.success && !!res.logout){
        return logUserOut()
      }
    else  if (!res.success) {
        Alert.alert(res.message || "error");
      } else {
         Alert.alert("Successfully Updated");
        queryClient.invalidateQueries({ queryKey: ["cars"],exact:true });
        queryClient.invalidateQueries({ queryKey: ["carDetails", carId] ,exact:true});
        
      }

      }
     catch (error) {
        console.log(error)
   
    }
  }

  const setValue = (el: number, i: number) => {
    const array = form.getValues("pricings");
    array[i] = el;
    form.setValue("pricings", array);
  };

  const addRow = () => {
    const array = form.getValues("pricings");
    const newArray = [...array, 0];
    form.setValue("pricings", newArray);
  };

   const deleteRow=(index:number)=>{
    const array = form.getValues('pricings')
    const newArray = array.filter((el,i)=>i!==index)
    form.setValue('pricings',newArray)

  }

  return { form, onSubmit, setValue, addRow ,deleteRow};
};
