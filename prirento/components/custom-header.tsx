import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Using MaterialCommunityIcons for example
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/auth.hook';

const CustomHeader = ({cars}:{cars?:boolean}) => {

  const {user,signout} = useAuth()

  return (
    <View style={styles.container}>
      {/* Account Image and Name Placeholder */}
      <View style={styles.accountContainer}>
        <Image style={styles.logo} source={{uri:user?.logo}} resizeMode='contain' width={35} height={35} />
        <View style={styles.infoWrapper}>
        <Text style={styles.accountName}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={signout}>
          <Text>
          logout
          </Text>
    
        </TouchableOpacity>
   
      </View>

      {/* Bell Icon for Notifications */}


      <Link asChild href={`/(app)/${cars ? 'cars' : '(home)'}/notifications`}>
      <TouchableOpacity onPress={() => {}}>
        <Feather name="bell" size={30} color="#000" />
      </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor:'white'
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoWrapper:{
    marginLeft: 10,
  },
  accountName: {

    fontWeight:'500',
    textTransform:'capitalize'
    
  
  },
  email:{
    fontSize:12,
    color:'gray'
  },
  logo:{
    borderRadius:100,
   
  }
 
});

export default CustomHeader;