import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{tabBarActiveTintColor:'black'}}
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
        name="cars/index"
        
        options={{
          headerShown:false,
          title: 'Cars',
          
          tabBarIcon: ({ color }) => <Ionicons name="car-sport-outline" size={20} color={color} />,
   
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
