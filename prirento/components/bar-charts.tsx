import { BookingsChart } from '@/types';
import React from 'react';
import {View, Dimensions} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

// Define the type for your booking data
interface Booking {
  date: string; // Format: "YYYY-MM-DD"
}

interface BarChartComponentProps {
  bookings: BookingsChart[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({bookings}) => {
  const screenWidth = Dimensions.get('window').width;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter bookings for the current month and year
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
  });

  // Calculate bookings per day for the current month
  const bookingsPerDay: {[key: number]: number} = {};

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

  return (
    <View>
      <BarChart
        style={{height: 220, width: screenWidth}}
        data={chartData}
        xAxis={{
          position: 'BOTTOM',
          granularity: 1,
          granularityEnabled: true,
          drawGridLines: false,
        }}
        yAxis={{left: {drawGridLines: false}, right: {enabled: false}}}
        chartDescription={{text: ''}}
        legend={{enabled: false}}
      />
    </View>
  );
};

export default BarChartComponent;
