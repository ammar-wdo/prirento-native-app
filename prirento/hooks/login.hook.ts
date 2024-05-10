import { fetcher, poster } from "@/lib/utils";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { User, useAuth } from "./auth.hook";
import { GET_AUTH } from "@/links";
import { Alert } from "react-native";
import { useRouter } from "expo-router";


export const useLogin = () => {
  const { signin } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    
    formState: { errors, isSubmitting,touchedFields },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    criteriaMode: "all"
  });



  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await poster<{
        success: boolean;
        error?: string;
        user: User;
      }>(GET_AUTH, data);

 
    console.log(res)


      if (!res.success) {
       return  Alert.alert(
          "Login Failed",
          res?.error ? res.error : "An unknown error occurred. Please try again." // Message of the alert
        );
      
      }

      signin(res.user)
      // router.push('/(app)/(home)')
    } catch (error) {
        console.warn(error)
        Alert.alert("Error", "An error occurred while attempting to log in. Please try again later.");
    }
  };

  return { onSubmit, register, handleSubmit, setValue, errors, isSubmitting,touchedFields,control };
};
