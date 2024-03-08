
import { Slot } from 'expo-router';



import { AuthProvider } from "@/hooks/auth.hook";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function RootLayoutNav() {


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaView style={{flex:1}}>

 
       <Slot />
       </SafeAreaView>
      </AuthProvider>
      </QueryClientProvider>
  
  );
}
