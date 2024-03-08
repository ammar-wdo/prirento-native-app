


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



export type CarModel = {
  id:string,
  name:string,
  carBrand:{
    brand:string,
    logo:string

  }
}