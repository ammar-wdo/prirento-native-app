import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import {  Redirect, Tabs, useRouter } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';

import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/auth.hook';






function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
const router = useRouter()
  if(!user) return <Redirect href="/(modals)/signin" />;


  return (
    <Tabs
    screenOptions={{tabBarActiveTintColor:'black',tabBarStyle:{paddingBottom:5,paddingTop:5}}}
    
    >
      <Tabs.Screen
        name="index"
        
        options={{
          headerShown:false,
          title: 'Home',
          
          
          tabBarIcon: ({ color }) => <Feather name="home" size={20} color={color} />,
       
        }}
      />
      <Tabs.Screen
        name="cars"
        
        options={{
          headerShown:false,
          title: 'My Cars',
          
          tabBarIcon: ({ color }) => <Ionicons  name="car-sport-outline" size={20} color={color}  />,
   
        }}
      />
      <Tabs.Screen
        name="addCar"
        
        options={{
          headerShown:false,
          title: 'Add Car',
          
          
          tabBarIcon: ({ color }) => <Feather name="plus-circle" size={20} color={color} />,
   
        }}
      />
      <Tabs.Screen
        name="bookings"
        
        options={{
          headerShown:false,
          title: 'Bookings',
          
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="sticker-check-outline" size={20} color={color} />,
   
        }}
      />
      <Tabs.Screen
        name="settings/index"
        
        options={{
          title: "Settings",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Ionicons name="chevron-back" onPress={() => router.back()} size={25}/>
            ),
          
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={20} color={color} />,
   
        }}
      />
  
    </Tabs>
  );
}
