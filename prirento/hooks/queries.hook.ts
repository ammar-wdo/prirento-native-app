import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./auth.hook";
import { CarCard, CarModel } from "@/types";
import { fetcher } from "@/lib/utils";
import { CarDetail, ComingCar } from "@/schemas";
import { Platform } from 'react-native';

const url = Platform.select({
ios:'http://192.168.1.191:3001',
android:'http://10.0.2.2:3001'
}) 


export const useCarsQuery = ()=>{


    const {user} = useAuth()

    return useQuery({
      queryKey: ['cars'],
      queryFn: () => fetcher<{
        success: boolean;
        cars: CarCard[];
        error?: string;
      }>(`${url}/api/native/cars`,user?.token),
    })

}




export const useCarQuery = (carId:string)=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['carDetails', carId],
    queryFn: () => fetcher<{
      success: boolean;
      car: ComingCar;
      error?: string;
    }>( `${url}/api/native/car/${carId}/details`,user?.token),
  })


}

export const useModelsQuery = ()=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['models'],
    queryFn: () => fetcher<{
      success: boolean;
      models: CarModel[];
      error?: string;
    }>(`${url}/api/native/models`,user?.token),
  })


}
