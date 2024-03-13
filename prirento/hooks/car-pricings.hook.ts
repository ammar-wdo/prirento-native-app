"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { carPricingsSchema } from "@/schemas";
import { useRouter } from "expo-router";
import { Alert } from "react-native";



type Props = {
  pricings: number[];
  hourPrice: number | null;

};

export const usePricings = ({ pricings, hourPrice}: Props) => {
  const form = useForm<z.infer<typeof carPricingsSchema>>({
    resolver: zodResolver(carPricingsSchema),
    defaultValues: {
      pricings: pricings,
      hourPrice: hourPrice || undefined,
    },
  });

  useEffect(() => {
    if (pricings) {
      const requiredLength = 14;
      const arrayLength = form.getValues("pricings").length;

      if (arrayLength >= requiredLength) return;

      const remainigLength = requiredLength - arrayLength;
      const remainigArray = Array(remainigLength).fill(0);

      const newArray = [...form.getValues("pricings"), ...remainigArray];

      form.setValue("pricings", newArray);
    }
  }, [pricings]);

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof carPricingsSchema>) {
    try {
   
     Alert.alert(JSON.stringify(values))

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
