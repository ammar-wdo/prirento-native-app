import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useCarQuery } from "@/hooks/queries.hook";

import { usePricings } from "@/hooks/car-pricings.hook";

import { usePathname } from "expo-router";
import FormWrapper from "@/components/form-wrapper";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import PriceInput from "@/components/price-input";
import CustomButton from "@/components/custom-button";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Pricing = () => {
  const pathname = usePathname();
  const carId = pathname.split("/")[2];
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

      form.reset({
        pricings: carData?.car.pricings,
        hourPrice: carData?.car.hourlyPrice,
      });
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
      {form.formState.errors.hourPrice && (
        <Text style={{ color: "red", fontSize: 10 }}>
          {form.formState.errors.hourPrice.message}
        </Text>
      )}
      {/* pricings */}
      <View style={{ marginTop: 12 }}>
        <Controller
          control={form.control} // From useForm()
          name="pricings"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {value.map((price, i) => (
                <PriceInput
                  deleteRow={deleteRow}
                  key={i}
                  value={value[i].toString()}
                  index={i.toString()}
                  setValue={setValue}
                />
              ))}
            </View>
          )}
        />
        {form.formState.errors.pricings && (
          <Text style={{ color: "red", fontSize: 10 }}>
            {form.formState.errors.pricings.message}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={addRow}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#777",
          justifyContent: "center",
          padding: 12,
          borderRadius: 6,
        }}
      >
        <Feather name="plus" color={"white"} />
        <Text style={{ color: "white" }}>Add new day</Text>
      </TouchableOpacity>
      <CustomButton
      disabled={form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
        onPress={form.handleSubmit(onSubmit)}
        title="Update Pricings"
        textStyle={{ fontWeight: "600" }}
        style={{
          backgroundColor: Colors.secondaryGreen,
          marginTop: 12,
          padding: 12,
          borderRadius: 6,
        }}
      />
    </ScrollView>
  );
};

export default Pricing;

const styles = StyleSheet.create({});
