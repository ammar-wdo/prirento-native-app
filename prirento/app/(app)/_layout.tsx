import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import {  Redirect, Tabs } from 'expo-router';

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

  if(!user) return <Redirect href="/signin" />;


  return (
    <Tabs
    screenOptions={{tabBarActiveTintColor:'black',tabBarStyle:{paddingBottom:5,paddingTop:5}}}
    
    >
      <Tabs.Screen
        name="(home)"
        
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
        name="addCar/index"
        
        options={{
          headerShown:false,
          title: 'Add Car',
          
          tabBarIcon: ({ color }) => <Feather name="plus-circle" size={20} color={color} />,
   
        }}
      />
      <Tabs.Screen
        name="bookings/index"
        
        options={{
          headerShown:false,
          title: 'Bookings',
          
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="sticker-check-outline" size={20} color={color} />,
   
        }}
      />
      <Tabs.Screen
        name="settings/index"
        
        options={{
          headerShown:false,
          title: 'Settings',
          
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={20} color={color} />,
   
        }}
      />
  
    </Tabs>
  );
}
