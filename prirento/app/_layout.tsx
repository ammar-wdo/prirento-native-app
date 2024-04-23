import { Redirect, Slot, Stack, useRouter } from "expo-router";

import { AuthProvider, useAuth } from "@/hooks/auth.hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { ModalProvider } from "@/hooks/modal-hook";


const queryClient = new QueryClient();



export default function RootLayoutNav() {
  const { user } = useAuth();
  const router = useRouter()

  return (
    <ModalProvider>
    <QueryClientProvider client={queryClient}>


 
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack screenOptions={{headerBackTitleVisible:false}}>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modals)/signin"
              options={{
                headerShown: false,
                
                
              }}
            />
            <Stack.Screen
              name="(modals)/notifications"
              options={{
                
                
                title: "Notifications",
                headerTitleAlign: "center",
             
                headerLeft:()=><Ionicons size={20} name="arrow-back" onPress={()=>router.push('/(app)')} />
              }}
            />
        
            <Stack.Screen
              name="(modals)/privacy"
              options={{
                
                
                title: "Privacy Policy",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="(modals)/terms"
              options={{
                
                
                title: "Terms & Conditions",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="(modals)/personal-info"
              options={{
                
                
                title: "Persona Information",
                headerTitleAlign: "center",
              }}
            />
          </Stack>
        </SafeAreaView>
      </AuthProvider>
  
    </QueryClientProvider>
    </ModalProvider>
  );
}
