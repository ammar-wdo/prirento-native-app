

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
export const EDIT_CAR= (carId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/edit`
export const ADD_CAR= MAIN_BACKEND + `/api/native/car`
export const GET_BOOKING_DETAILS = (bookingId:string)=> MAIN_BACKEND + `/api/native/bookings/${bookingId}`
export const GET_CAR_EXTRA_OPTIONS = (carId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/extraOptions`
export const GET_CAR_EXTRA_OPTIONS_DETAILS = (carId:string,optionId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/extraOptions/${optionId}`
export const GET_NOTIFICATIONS= MAIN_BACKEND + '/api/native/notifications'
export const GET_NOTIFICATIONS_COUNT= MAIN_BACKEND + '/api/native/notifications/count'
export const GET_COMPANY = MAIN_BACKEND + '/api/native/company'
export const CHANGE_PASSWORD = MAIN_BACKEND + '/api/native/password'
export const GET_CAR_AVAILABILITIES = (carId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/availability`
export const GET_CAR_AVAILABILITIES_DETAILS = (carId:string,availabilityId:string)=> MAIN_BACKEND + `/api/native/car/${carId}/availability/${availabilityId}`