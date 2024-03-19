export type CarCard = {
  id: string;
  carName: string;
  year: string;
  image: string;
  status: "Booked" | "Blocked" | "Available";
};

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
  id: string;
  name: string;
};

export type CarModel = {
  id: string;
  name: string;
  carBrand: {
    brand: string;
    logo: string;
  };
};

export type RecentCar = {
  id: string;
  carName: string;
  carImage: string;
  bookingsCount: number;
};

export type BookingCard = {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  total: number;
  name: string;
  bookingCode: string;
  pickupLocation: string;
  dropoffLocation: string;
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type BookingsChart = {
  payLater: number;
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type BookingInfo = {
  total: number;
  count: number;
  bookings: BookingsChart[];
};

export type CarExtraOptions = {
  id: string;
  label: string;
  description: string;
  price: number;
  status: "active" | "pending";
  logo: string;
  carId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CarSuperAdminRule = {
  id: string;
  label: string;
  description: string;
  type: "fixed" | "percentage";
  value: number;
  valueToPay: number;
  mandatory: boolean;
  applyToAll: boolean;
  carId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Booking = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  countryOfResidance: string;

  billingAddress: string;
  billingFirstName: string;
  billingLastname: string;
  billingContactNumber: string;
  billingCountry: string;
  billingCity: string;
  billingZipcode: string;

  business?: boolean;
  companyName?: string;
  companyVat?: string;

  startDate: string;
  endDate: string;

  pickupLocation: string;
  dropoffLocation?: string;

  extraOptions: CarExtraOptions[];
  adminRules: CarSuperAdminRule[];

  subtotal: number;
  reservationFee: number;
  discount: number;
  deliveryFee?: number;
  total: number;
  payNow: number;
  payLater: number;
  deposit: number;

  bookingCode: string;

  terms: boolean;

  paymentMethod: "card" | "paypal";
  paymentStatus: "PENDING" | "SUCCEEDED" | "EXPIRED" | "CANCELED";
  bookingStatus: "ACTIVE" | "REFUND_REQUEST" | "REFUNDED" | "CANCELED";

  carName: string;
  carImage: string;

  createdAt: string;
};

export type ExtraOption = {
  id: string;
  label: string;
  description: string;
  price: number;
  status: "active" | "pending";
  logo: string;

  carId: string;

  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: string;
  message: string;
  carName: string;
  isRead:boolean,
  type: "BOOKING" | "EXPIRE";
  booking: {
    id: string;
  };
  createdAt:string
};
