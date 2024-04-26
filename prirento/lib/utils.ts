import axios from "axios";
import Config from 'react-native-config';
import { API_SECRET } from '@env';




export const fetcher = async <T>(url: string,token?: string): Promise<T> => {

    const response = await axios.get<T>(url, {
      headers: {
        "api-Secret": API_SECRET,
        ...(token && { 'Authorization': `Bearer ${token}`})
      },
    });


    return response.data;
  }


  export const poster = async <T>(url: string, body: any,token?: string): Promise<T> => {
    // Default headers can be extended or overridden by the headers argument
   

    const response = await axios.post<T>(url, body, {
        headers: {
          "api-Secret": API_SECRET,
          ...(token && { 'Authorization': `Bearer ${token}`})
       
        },
    });

    return response.data;
};
  export const remover = async <T>(url: string,token?: string): Promise<T> => {
    // Default headers can be extended or overridden by the headers argument
   

    const response = await axios.delete<T>(url, {
        headers: {
          "api-Secret": API_SECRET,
          ...(token && { 'Authorization': `Bearer ${token}`})
       
        },
    });

    return response.data;
};



export function timeFromNow(targetDateStr: string): string {
  const targetDate = new Date(targetDateStr);
  const now = new Date();

  // Calculate the difference in milliseconds
  let diff = now.getTime() - targetDate.getTime();

  // Calculate time differences
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
  
}

export function getCurrentMonthYear(): string {
  const now: Date = new Date();
  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month: string = months[now.getMonth()];
  const year: number = now.getFullYear();

  return `${month} ${year}`;
}


 export function formatDate(
  date: Date,
  locale: string = "en-GB",
  options: Intl.DateTimeFormatOptions & { timeZone: string } = {
    timeZone: "UTC", // Ensuring timezone is always included in the options
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  }
): string {
  // Merge default options with any user-provided options
  const mergedOptions: Intl.DateTimeFormatOptions = { ...options };

  return new Intl.DateTimeFormat(locale, mergedOptions).format(date);
}


export const capitalizer = (value:string)=>{

return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}





export function getTime(date: Date | undefined) {
  if (!date) {
    return "";
  }

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function generateHourlyTimes() {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    // Pad the hour with a leading zero if it's less than 10
    const formattedHour = hour.toString().padStart(2, '0');
    times.push(`${formattedHour}:00`);
  }
  return times;
}


export function convertDateToISOString(date:Date | undefined) {
  if (!date) {
    return undefined;
  }



  // Manually construct the ISO string in YYYY-MM-DD format
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  // Pad single digit month and day with leading zeros
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  return `${year}-${paddedMonth}-${paddedDay}`;

}