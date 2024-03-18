

export const MAIN_BACKEND = process.env.EXPO_PUBLIC_BACKEND_URL
export const GET_AUTH = MAIN_BACKEND + '/api/native/auth'
export const GET_BOOKINS_INFO = MAIN_BACKEND + '/api/native/bookings/info'
export const GET_RECENT_BOOKINGS = MAIN_BACKEND + '/api/native/bookings?take=10'
export const GET_BOOKINGS = MAIN_BACKEND + '/api/native/bookings'
export const GET_RECENT_CARS = MAIN_BACKEND + '/api/native/cars/recent'
export const GET_LOCATIONS = MAIN_BACKEND + '/api/native/locations'
export const GET_MODELS = MAIN_BACKEND + '/api/native/models'
export const GET_CARS= MAIN_BACKEND + '/api/native/cars'
export const GET_CAR_DETAILS = (carId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/details`
export const GET_BOOKING_DETAILS = (bookingId:string)=> MAIN_BACKEND + `/api/native/bookings/${bookingId}`
export const GET_CAR_EXTRA_OPTIONS = (carId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/extraOptions`
export const GET_CAR_EXTRA_OPTIONS_DETAILS = (carId:string,optionId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/extraOptions/${optionId}`