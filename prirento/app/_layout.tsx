import { Slot, Stack } from "expo-router";

import { AuthProvider } from "@/hooks/auth.hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";


const queryClient = new QueryClient();



export default function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>


 
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modals)/signin"
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen
              name="(modals)/notifications"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                title: "Notifications",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="(modals)/help"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                title: "Help Center",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="(modals)/privacy"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                title: "Privacy Policy",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="(modals)/terms"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                title: "Terms & Conditions",
                headerTitleAlign: "center",
              }}
            />
          </Stack>
        </SafeAreaView>
      </AuthProvider>
  
    </QueryClientProvider>
  );
}
