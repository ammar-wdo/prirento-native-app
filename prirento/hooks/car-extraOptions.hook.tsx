import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { carExtraOptionsSchema } from "@/schemas";


import { ExtraOption } from "@/types";
import { fetcher, poster } from "@/lib/utils";
import { GET_CAR_EXTRA_OPTIONS, GET_CAR_EXTRA_OPTIONS_DETAILS } from "@/links";
import { useAuth } from "./auth.hook";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "./modal-hook";


export const useCarExtraOptions = (extraOption : ExtraOption | undefined,carId:string) => {

const {user} = useAuth()
    console.log('Extra Option',extraOption)
  const form = useForm<z.infer<typeof carExtraOptionsSchema>>({
    resolver: zodResolver(carExtraOptionsSchema),
    defaultValues: {
      label: extraOption?.label || "",
      description: extraOption?.description || "",
      price: extraOption?.price || undefined,

      logo: extraOption?.logo || "",
    },
  });
const router = useRouter()

const {control} = useModal()
const queryClient = useQueryClient()
  async function onSubmit(values: z.infer<typeof carExtraOptionsSchema>) {
    try {

      let res

      if(extraOption){
 res = await poster<{success:boolean,error?:string}>(GET_CAR_EXTRA_OPTIONS_DETAILS(carId,extraOption.id),values,user?.token)


      }else{
         res = await poster<{success:boolean,error?:string}>(GET_CAR_EXTRA_OPTIONS(carId),values,user?.token)
       

      }
      console.log('res',res)
      if(res.success){
        queryClient.invalidateQueries({queryKey:['extraOptions', carId]})
       control(false)
        Alert.alert(extraOption ? 'Successfully Updated' : 'Successfully Created')
        }else if(res.error){
          Alert.alert(res.error)
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
