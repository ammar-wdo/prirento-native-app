import { CarDetail, ComingCar, carSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { string, z } from "zod";




export const useCarEdit = (car: ComingCar | undefined )=>{

    const usedPickups = car?.pickupLocations.map((el) => el.id);
    const usedDropoffs = car?.dropoffLocations.map((el) => el.id);


  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
        additionalFeatures: (car?.additionalFeatures || []) as {
          title: string;
          icon: string;
        }[],
        carModelId: car?.carModelId || "",
     
        carType: car?.carType || 'SUV',
        colors: car?.colors || 'Beige',
      
     
    
        coolDown: car?.coolDown || undefined,
        deleviryFee: car?.deleviryFee || undefined,
        deposite: car?.deposite || undefined,
        description: car?.description || "",
        disabled: car?.disabled || false,
        doors: car?.doors || undefined,
        electric: car?.electric || "fully_electric",
        engine: car?.engine || "",
        gallary: car?.gallary || [],
        interiorColor: car?.interiorColor || "Beige",
        kmIncluded: car?.kmIncluded || undefined,
        minimumHours: car?.minimumHours || undefined,
     
   
        seats: car?.seats || undefined,
        transmition: car?.transmition || "auto",
        year: car?.year || "",
        pickupLocations: usedPickups,
        dropoffLocations:usedDropoffs,
     
      },
  });


  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof carSchema>) => {
    try {
   

    } catch (error) {
        console.warn(error)
        Alert.alert("Error", "Something went wrong");
    }
  };



  return {form,onSubmit}

}