import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./auth.hook";
import { BookingCard, CarCard, CarModel, Location, RecentCar } from "@/types";
import { fetcher } from "@/lib/utils";
import { CarDetail, ComingCar } from "@/schemas";
import { Platform } from 'react-native';

export const url = Platform.select({
ios:'http://192.168.1.191:3000',
android:'http://10.0.2.2:3000'
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



export const useLocatonsQuery = ()=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['locations'],
    queryFn: () => fetcher<{
      success: boolean;
      locations: Location[];
      error?: string;
    }>(`${url}/api/native/locations`,user?.token),
  })


}



export const useRecentCarsQuery = ()=>{


  const {user} = useAuth()

  return useQuery({
    queryKey: ['recentCars'],
    queryFn: () => fetcher<{
      success: boolean;
      cars: RecentCar[];
      error?: string;
    }>(`${url}/api/native/cars/recent`,user?.token),
  })

}


export const useRecentBookingsQuery = ()=>{


  const {user} = useAuth()

  return useQuery({
    queryKey: ['recentBookings'],
    queryFn: () => fetcher<{
      success: boolean;
      bookings: BookingCard[];
      error?: string;
    }>(`${url}/api/native/bookings?take=10`,user?.token),
  })

}
