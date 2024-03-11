import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";


import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";

import { Colors } from "@/constants/Colors";
import FormWrapper from "@/components/form-wrapper";
import Input from "@/components/Input";
import { RefreshControl } from 'react-native';
import { useCarEdit } from "@/hooks/car-edit.hook";
import { useCarQuery, useModelsQuery } from "@/hooks/queries.hook";

const CarDetails = () => {
  const { carId } = useLocalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  // fetch car details
  const {
    data: carData,
    isLoading: carIsLoading,
    error: carError,
    refetch:refetchCarDetails
  } = useCarQuery(carId as string);
  // fetch brands

  const {
    data: modelsData,
    isLoading: modelsLoading,
    error: modelsError,
    refetch:refetchModels
  } = useModelsQuery()

   // Function to handle the refresh action
   const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    Promise.all([refetchCarDetails(),refetchModels()])
      .finally(() => setRefreshing(false)); // Stop the refreshing indicator
  }, [carId]);


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

    console.log('modelId',form.watch('carModelId'))

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
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
                    selectedValue={sortedModels.find(model=>model.id === value)?.id}
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
