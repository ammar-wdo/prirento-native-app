


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

export type SingleCarDetails = {
  id: string;
  carName: string;
  brand: string;
  year: string;
  transmition: Transmition;
  engine: string;
  doors: number;
  electric: Electric;
  carType: CarTypes;
  seats: number;
  description: string;
  specifications: { title: string; icon: string }[];
  gallary: string[];
  slug:string,
  kmIncluded:number;
  minimumHours:number|null,
  pickupLocations:string[],
  dropoffLocations:string[],
  terms:string,
  companyName:string

 

};