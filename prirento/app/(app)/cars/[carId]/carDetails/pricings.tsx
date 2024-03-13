import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useCarQuery } from "@/hooks/queries.hook";

import { usePricings } from "@/hooks/car-pricings.hook";
import { Colors } from "react-native/Libraries/NewAppScreen";


import { usePathname } from 'expo-router'
import FormWrapper from "@/components/form-wrapper";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import PriceInput from "@/components/price-input";


const Pricing = () => {

const pathname = usePathname()
const carId = pathname.split('/')[2]
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: carData,
    isLoading: carIsLoading,
    error: carError,
    refetch: refetchCarDetails,
  } = useCarQuery(carId as string);

  const { form, onSubmit, addRow, deleteRow, setValue } = usePricings({
    hourPrice: carData?.car?.hourlyPrice!,
    pricings: carData?.car?.pricings!,
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetchCarDetails()]);

      form.reset();
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, [carData, refetchCarDetails, form.reset]);

  if (carIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );
  }
  if (!carData?.success) return <Text>{carData?.error}</Text>;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >

<Controller
            control={form.control} // From useForm()
            name="hourPrice"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value.toString()}
                setValue={onChange}
                label="Hourly Price"
                numeric={true}
                
              />
            )}
          />
          {/* pricings */}
          <View style={{marginTop:12}}>
          <Controller
            control={form.control} // From useForm()
            name="pricings"
            render={({ field: { onChange, onBlur, value } }) => (
           <View>
            {value.map((price,i)=><PriceInput key={i} value={value[i].toString()} index={(i).toString()} setValue={setValue} />)}
           </View>
            )}
          />
          </View>
    </ScrollView>
  );
    };

export default Pricing;

const styles = StyleSheet.create({});
