import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Using MaterialCommunityIcons for example
import { Link } from 'expo-router';

const CustomHeader = ({cars}:{cars?:boolean}) => {
  return (
    <View style={styles.container}>
      {/* Account Image and Name Placeholder */}
      <View style={styles.accountContainer}>
        <MaterialCommunityIcons name="account-circle" size={30} color="#000" />
        <Text style={styles.accountName}>Account Name</Text>
      </View>

      {/* Bell Icon for Notifications */}


      <Link asChild href={`/(tabs)/${cars ? 'cars' : '(home)'}/notifications`}>
      <TouchableOpacity onPress={() => {}}>
        <MaterialCommunityIcons name="bell" size={30} color="#000" />
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
    height: 60, // Adjust based on your needs
    backgroundColor:'white'
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountName: {
    marginLeft: 10,
    // Additional styling for the account name text
  },
  // Add more styles as needed
});

export default CustomHeader;
