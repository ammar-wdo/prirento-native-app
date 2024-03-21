import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./auth.hook";
import { Booking, BookingCard, BookingInfo, CarCard, CarModel, ExtraOption, Location, Notification, RecentCar } from "@/types";
import { fetcher } from "@/lib/utils";
import { CarDetail, ComingCar, Company } from "@/schemas";
import { Platform } from 'react-native';
import { GET_BOOKINGS, GET_BOOKING_DETAILS, GET_BOOKINS_INFO, GET_CARS, GET_CAR_DETAILS, GET_CAR_EXTRA_OPTIONS, GET_CAR_EXTRA_OPTIONS_DETAILS, GET_COMPANY, GET_LOCATIONS, GET_MODELS, GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT, GET_RECENT_BOOKINGS, GET_RECENT_CARS } from "@/links";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

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
      car: ComingCar &{brand:string,model:string};
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



export const useBookingDetailsQuery = (bookingId:string)=>{


  const {user} = useAuth()

  return useQuery({
    queryKey: ['bookingDetails',bookingId],
    queryFn: () => fetcher<{
      success: boolean;
      bookingDetails: Booking;
      error?: string;
    }>(GET_BOOKING_DETAILS(bookingId),user?.token),
  })

}


export const useCarExtraOptionsQuery = (carId:string)=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['extraOptions', carId],
    queryFn: () => fetcher<{
      success: boolean;
      extraOptions:ExtraOption[];
      error?: string;
    }>(GET_CAR_EXTRA_OPTIONS(carId),user?.token),
  })


}
export const useCarExtraOptionsDetailsQuery = (carId:string,optionId:string)=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['extraOption', optionId],
    queryFn: () => fetcher<{
      success: boolean;
      extraOption:ExtraOption;
      error?: string;
      
    }
  
    
    
    >(GET_CAR_EXTRA_OPTIONS_DETAILS(carId,optionId),user?.token),

  })


}


export const useNotifications = ()=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['notifications'],
    queryFn: () => fetcher<{
      success: boolean;
      notifications:Notification[];
      error?: string;
      
    }
  
    
    >(GET_NOTIFICATIONS,user?.token),
 refetchOnMount:'always'
  })
}



export const useNotificationsCount = ()=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['notificationsCount'],
    queryFn: () => fetcher<{
      success: boolean;
      count:number;
      error?: string;
      
    }
 
    >(GET_NOTIFICATIONS_COUNT,user?.token),
    refetchInterval:60000
 
  })


}




export const useCompany = ()=>{


  const {user} = useAuth()

  return useQuery({
 queryKey: ['company'],
    queryFn: () => fetcher<{
      success: boolean;
      company:Company;
      error?: string;
      
    }
  
    
    >(GET_COMPANY,user?.token),

  })
}
