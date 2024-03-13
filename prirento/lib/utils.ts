import axios from "axios";
import Config from 'react-native-config';
import { API_SECRET } from '@env';




export const fetcher = async <T>(url: string,token?: string): Promise<T> => {
 console.log('token',token)
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