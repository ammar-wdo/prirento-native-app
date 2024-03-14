


export type CarCard = {
    id: string,
    carName:string,
    year: string,
  image:string,
  status : 'Booked' | 'Blocked' | 'Available'
}


export type CarTypes =
  | "super_cars"
  | "sports"
  | "convertable"
  | "business"
  | "classics"
  | "SUV";
export type Transmition = "auto" | "manual";
export type Electric = "fully_electric" | "hybrid" | "none";

export type Location = {
  id:string,
  name:string
}

export type CarModel = {
  id:string,
  name:string,
  carBrand:{
    brand:string,
    logo:string

  }
}

export type RecentCar = {
id:string,
carName:string,
carImage:string,
bookingsCount:number
}

export type BookingCard = {
  id:string,
  carId:string,
  carName:string,
  carImage:string,
  total:number,
  name:string,
  bookingCode:string,
  pickupLocation:string
  dropoffLocation:string,
  createdAt:string
}

export type BookingInfo = {
  total:number,
  count:number
}