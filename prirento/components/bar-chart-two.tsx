import { Colors } from '@/constants/Colors';
import { BookingsChart } from '@/types';
import React from 'react';
import {View, Dimensions} from 'react-native';
import { BarChart } from "react-native-gifted-charts";

// Define the type for your booking data
interface Booking {
  date: string; // Format: "YYYY-MM-DD"
}

interface BarChartComponentProps {
  bookings: BookingsChart[];
}

const BarChartComponentTwo: React.FC<BarChartComponentProps> = ({bookings}) => {
  const screenWidth = Dimensions.get('window').width;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Filter bookings for the current month and year
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
  });

  // Calculate bookings per day for the current month
  const bookingsPerDay: {[key: number]: number} = {};
  for (let day = 1; day <= daysInMonth; day++) {
    bookingsPerDay[day] = 0;
  }

  filteredBookings.forEach((booking) => {
    const day = new Date(booking.createdAt).getDate();
    bookingsPerDay[day] = (bookingsPerDay[day] || 0) + 1;
  });

  // Prepare data for the chart
  const chartData = {
    dataSets: [{
      values: Object.keys(bookingsPerDay).map((day) => ({y: bookingsPerDay[parseInt(day)], x: parseInt(day) - 1})),
      label: 'Bookings',
    }],
    config: {
      color: 'blue',
      barWidth: 0.3,
    },
  };


const data = Object.entries(bookingsPerDay).map(([key,value])=>({value: value, label: key}))


return (
    <View>
        <BarChart

            barWidth={10}
            noOfSections={5}
            barBorderRadius={0}
            frontColor={Colors.mainDark}
            data={data}
            yAxisColor={Colors.mainDark}
            xAxisColor={Colors.mainDark}
            yAxisThickness={1}
            xAxisThickness={1}
            spacing={20}
         

         
        
            
hideRules

            color={Colors.mainDark}
          
        />
    </View>
);
};

export default BarChartComponentTwo;
