import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCustomQuery } from "@/hooks/custom-query.hook";
import { CarModel } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";

import { Colors } from "@/constants/Colors";
import FormWrapper from "@/components/form-wrapper";
import Input from "@/components/Input";
import { CarDetail, ComingCar } from "@/schemas";
import { useCarEdit } from "@/hooks/car-edit.hook";

const CarDetails = () => {
  const { carId } = useLocalSearchParams();
  const router = useRouter();

  // fetch car details
  const {
    data: carData,
    isLoading: carIsLoading,
    error: carError,
  } = useCustomQuery<{
    success: boolean;
    car: ComingCar;
    error?: string;
  }>(
    `details-${carId}`,
    `http://10.0.2.2:3001/api/native/car/${carId}/details`
  );
  // fetch brands

  const {
    data: modelsData,
    isLoading: modelsLoading,
    error: modelsError,
  } = useCustomQuery<{
    success: boolean;
    models: CarModel[];
    error?: string;
  }>(`models`, `http://10.0.2.2:3001/api/native/models`);


  const { form, onSubmit } = useCarEdit(carData?.car);


  if (carIsLoading || modelsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );
  }
  if (!carData?.success || !modelsData?.success)
    return <Text>{carData?.error || modelsData?.error}</Text>;

    const sortedModels = modelsData.models.sort((a, b) => {
      const brandA = a.carBrand.brand.toLowerCase();
      const brandB = b.carBrand.brand.toLowerCase();
  
      if (brandA < brandB) {
        return -1;
      }
      if (brandA > brandB) {
        return 1;
      }
      return 0;
    });


  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <FormWrapper title="Basic Informations">
        <View style={{ gap: 12 }}>
          <View style={{ gap: 2 }}>
            <Text style={{ fontWeight: "800" }}>Car Model</Text>
            <View
              style={{
                borderColor: Colors.border,
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Controller
                control={form.control} // From useForm()
                name="carModelId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }
                    style={{ width: "100%", height: 44 }}
                  >
                    {sortedModels.map((model) => (
                      <Picker.Item
                        key={model.id}
                        label={`${model.carBrand.brand} ${model.name}`}
                        value={model.id}
                      />
                    ))}
                  </Picker>
                )}
              />
            </View>
          </View>

          <Controller
            control={form.control} // From useForm()
            name="year"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input value={value} setValue={onChange} label="Year" />
            )}
          />

          <Controller
            control={form.control} // From useForm()
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input value={value} setValue={onChange} label="Description" />
            )}
          />
        </View>
      </FormWrapper>
    </ScrollView>
  );
};

export default CarDetails;

const styles = StyleSheet.create({});
