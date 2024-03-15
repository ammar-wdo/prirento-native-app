import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./auth.hook";
import { BookingCard, BookingInfo, CarCard, CarModel, Location, RecentCar } from "@/types";
import { fetcher } from "@/lib/utils";
import { CarDetail, ComingCar } from "@/schemas";
import { Platform } from 'react-native';
import { GET_BOOKINGS, GET_BOOKINS_INFO, GET_CARS, GET_CAR_DETAILS, GET_LOCATIONS, GET_MODELS, GET_RECENT_BOOKINGS, GET_RECENT_CARS } from "@/links";

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
      }>(GET_CARS,user?.token),
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
    }>(GET_CAR_DETAILS(carId),user?.token),
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
    }>(GET_MODELS,user?.token),
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
    }>(GET_LOCATIONS,user?.token),
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
    }>(GET_RECENT_CARS,user?.token),
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
    }>(GET_RECENT_BOOKINGS,user?.token),
  })

}



export const useBookingsQuery = ()=>{


  const {user} = useAuth()

  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => fetcher<{
      success: boolean;
      bookings: BookingCard[];
      error?: string;
    }>(GET_BOOKINGS,user?.token),
  })

}



export const useBookingsInfoQuery = ()=>{


  const {user} = useAuth()

  return useQuery({
    queryKey: ['bookingsInfo'],
    queryFn: () => fetcher<{
      success: boolean;
      bookingsInfo: BookingInfo;
      error?: string;
    }>(GET_BOOKINS_INFO,user?.token),
  })

}
