
import { Slot } from 'expo-router';



import { AuthProvider } from "@/hooks/auth.hook";



export default function RootLayoutNav() {


  return (
 
      <AuthProvider>
       <Slot />
      </AuthProvider>
  
  );
}
