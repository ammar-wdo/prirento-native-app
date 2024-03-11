import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";

import { Colors } from "@/constants/Colors";
import FormWrapper from "@/components/form-wrapper";
import Input from "@/components/Input";
import { RefreshControl } from "react-native";
import { useCarEdit } from "@/hooks/car-edit.hook";
import { useCarQuery, useModelsQuery } from "@/hooks/queries.hook";
import {
  carColorsMapper,
  carColorsString,
  carTypes,
  carTypesString,
  electricString,
  transmitionString,
} from "@/schemas";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ImageUploader from "@/components/image-uploader";
import CustomItemsPickerModal from "@/components/custom-color-picker";
import CustomModePickerModal from "@/components/model-picker";

const CarDetails = () => {
  const { carId } = useLocalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [isInteriorColorPickerVisible, setInteriorColorPickerVisible] =
    useState(false);

  const [isModelPickerVisible, setModelPickerVisible] = useState(false);

  // fetch car details
  const {
    data: carData,
    isLoading: carIsLoading,
    error: carError,
    refetch: refetchCarDetails,
  } = useCarQuery(carId as string);
  // fetch brands

  const {
    data: modelsData,
    isLoading: modelsLoading,
    error: modelsError,
    refetch: refetchModels,
  } = useModelsQuery();

  // Function to handle the refresh action

  const { form, onSubmit } = useCarEdit(carData?.car);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetchCarDetails(), refetchModels()]);
      form.reset();
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, [carData, modelsData, refetchCarDetails, refetchModels, form.reset]);

  const sortedModels = useMemo(
    () =>
      modelsData?.models.sort((a, b) => {
        const brandA = a.carBrand.brand.toLowerCase();
        const brandB = b.carBrand.brand.toLowerCase();

        return brandA.localeCompare(brandB);
      }),
    [modelsData?.models]
  );

  const handleImageDelete = (id: string) => {
    const gallery = form.getValues("gallary");
    const newGallary = gallery.filter((el) => el !== id);

    form.setValue("gallary", newGallary);
  };

  if (carIsLoading || modelsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );
  }
  if (!carData?.success || !modelsData?.success)
    return <Text>{carData?.error || modelsData?.error}</Text>;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FormWrapper title="Basic Informations">
        <View style={{ gap: 12 }}>
          <View style={{ gap: 2 }}>
            <Text style={{ fontWeight: "800" }}>Car Model</Text>

            <Controller
              control={form.control} // From useForm()
              name="carModelId"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => setModelPickerVisible(true)}
                    style={styles.colorPickerTrigger}
                  >
                    <Text>
                      {
                        modelsData.models.find((el) => el.id === value)
                          ?.carBrand.brand
                      }{" "}
                      {modelsData.models.find((el) => el.id === value)?.name}
                    </Text>
                    {!!value && (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          backgroundColor: carColorsMapper[value],
                        }}
                      ></View>
                    )}
                    <FontAwesome5 name="caret-down" size={15} color={"#777"} />
                  </TouchableOpacity>
                  <CustomModePickerModal
                    isVisible={isModelPickerVisible}
                    items={modelsData.models} // Your colors array
                    selectedItem={value}
                    onSelectItem={onChange}
                    onClose={() => setModelPickerVisible(false)}
                  />
                </View>
              )}
            />
          </View>

          <Controller
            control={form.control} // From useForm()
            name="year"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                setValue={onChange}
                label="Year"
                numeric={true}
              />
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

      {/* apperance */}
      <View style={{ marginTop: 12 }}>
        <FormWrapper title="Appearance">
          {/* car colr */}
          <View style={{ gap: 2 }}>
            <Text style={{ fontWeight: "800" }}>Car Color</Text>

            <Controller
              control={form.control} // From useForm()
              name="colors"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => setColorPickerVisible(true)}
                    style={styles.colorPickerTrigger}
                  >
                    <Text>{form.watch("colors") || "Select Color"}</Text>
                    {!!value && (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          backgroundColor: carColorsMapper[value],
                        }}
                      ></View>
                    )}
                    <FontAwesome5 name="caret-down" size={15} color={"#777"} />
                  </TouchableOpacity>
                  <CustomItemsPickerModal
                    isVisible={isColorPickerVisible}
                    items={carColorsString} // Your colors array
                    selectedItem={value}
                    onSelectItem={onChange}
                    isColor={true}
                    onClose={() => setColorPickerVisible(false)}
                  />
                </View>
              )}
            />
          </View>
          {/* car interior color */}
          <View style={{ gap: 2 }}>
            <Text style={{ fontWeight: "800" }}>Car Interior Color</Text>

            <Controller
              control={form.control} // From useForm()
              name="interiorColor"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => setColorPickerVisible(true)}
                    style={styles.colorPickerTrigger}
                  >
                    <Text>{form.watch("colors") || "Select Color"}</Text>
                    {!!value && (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          backgroundColor: carColorsMapper[value],
                        }}
                      ></View>
                    )}
                    <FontAwesome5 name="caret-down" size={15} color={"#777"} />
                  </TouchableOpacity>
                  <CustomItemsPickerModal
                    isVisible={isInteriorColorPickerVisible}
                    items={carColorsString} // Your colors array
                    selectedItem={value}
                    onSelectItem={onChange}
                    onClose={() => setInteriorColorPickerVisible(false)}
                    isColor={true}
                  />
                </View>
              )}
            />
          </View>
          {/* Gallery */}
          <View style={{ gap: 2 }}>
            <Text style={{ fontWeight: "800" }}>Gallery</Text>

            <Controller
              control={form.control} // From useForm()
              name="gallary"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: "100%" }}>
                  <ImageUploader onUploadSuccess={onChange} />
                  <View
                    style={{
                      marginTop: 4,
                      flexDirection: "row",
                      gap: 5,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {form.watch("gallary").map((el, i) => (
                      <View
                        key={i}
                        style={{
                          flex: 1,
                          minWidth: "30%",
                          aspectRatio: 2 / 1,
                          borderColor: Colors.border,
                          overflow: "hidden",
                          borderRadius: 10,
                          borderWidth: 1,
                          position: "relative",
                        }}
                      >
                        <Image
                          resizeMode="cover"
                          source={{ uri: el }}
                          style={{ height: "100%", width: "100%" }}
                        />
                        <TouchableOpacity
                          onPress={() => handleImageDelete(el)}
                          style={{
                            position: "absolute",
                            top: 1,
                            right: 1,
                            backgroundColor: "red",
                            borderRadius: 100,
                            width: 15,
                            height: 15,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Ionicons name="close" color={"white"} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            />
          </View>
        </FormWrapper>
      </View>
      {/* Specifications */}
      <View style={{ marginTop: 12 }}>
        <FormWrapper title="Specifications">
          <View style={{ gap: 12 }}>
            {/* engine */}
            <Controller
              control={form.control} // From useForm()
              name="engine"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input value={value} setValue={onChange} label="Engine" />
              )}
            />

            {/* transmission */}
            <View style={{ gap: 2 }}>
              <Text style={{ fontWeight: "800" }}>Transmission</Text>
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
                  name="transmition"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                      selectedValue={transmitionString?.find(
                        (model) => model === value
                      )}
                      onValueChange={(itemValue, itemIndex) =>
                        onChange(itemValue)
                      }
                      style={{ width: "100%", height: 44 }}
                    >
                      {transmitionString?.map((el) => (
                        <Picker.Item key={el} label={el} value={el} />
                      ))}
                    </Picker>
                  )}
                />
              </View>
            </View>
            {/* electric */}

            <View style={{ gap: 2 }}>
              <Text style={{ fontWeight: "800" }}>Electric</Text>
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
                  name="electric"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                      selectedValue={electricString?.find(
                        (model) => model === value
                      )}
                      onValueChange={(itemValue, itemIndex) =>
                        onChange(itemValue)
                      }
                      style={{ width: "100%", height: 44 }}
                    >
                      {electricString?.map((el) => (
                        <Picker.Item key={el} label={el} value={el} />
                      ))}
                    </Picker>
                  )}
                />
              </View>
            </View>
            {/* car type */}
            <View style={{ gap: 2 }}>
              <Text style={{ fontWeight: "800" }}>Car Type</Text>
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
                  name="carType"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                      selectedValue={carTypesString?.find(
                        (model) => model === value
                      )}
                      onValueChange={(itemValue, itemIndex) =>
                        onChange(itemValue)
                      }
                      style={{ width: "100%", height: 44 }}
                    >
                      {carTypesString?.map((el) => (
                        <Picker.Item key={el} label={el} value={el} />
                      ))}
                    </Picker>
                  )}
                />
              </View>
            </View>
          </View>
        </FormWrapper>
      </View>
    </ScrollView>
  );
};

export default CarDetails;

const styles = StyleSheet.create({
  colorPickerTrigger: {
    padding: 10,
    margin: 10,
    width: "100%",
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
