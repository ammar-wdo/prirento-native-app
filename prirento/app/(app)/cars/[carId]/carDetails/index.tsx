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

import { Controller } from "react-hook-form";

import { Colors } from "@/constants/Colors";
import FormWrapper from "@/components/form-wrapper";
import Input from "@/components/Input";
import { RefreshControl } from "react-native";
import { useCarEdit } from "@/hooks/car-edit.hook";
import {
  useCarQuery,
  useLocatonsQuery,
  useModelsQuery,
} from "@/hooks/queries.hook";
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
import { CheckBox, Icon } from "@rneui/themed";

const CarDetails = () => {
  const { carId } = useLocalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [isInteriorColorPickerVisible, setInteriorColorPickerVisible] =
    useState(false);

  const [isModelPickerVisible, setModelPickerVisible] = useState(false);
  const [isTrasmissionPickerVisible, setTransmissionPickerVisible] =
    useState(false);
  const [isElectricPickerVisible, setElectricPickerVisible] = useState(false);
  const [isCarTypePickerVisible, setCarTypePickerVisible] = useState(false);

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

  const {
    data: locationsData,
    isLoading: locationsLoading,
    error: locationsError,
    refetch: locationsRefetch,
  } = useLocatonsQuery();

  // Function to handle the refresh action

  const { form, onSubmit } = useCarEdit(carData?.car);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([
        refetchCarDetails(),
        refetchModels(),
        locationsRefetch(),
      ]);
      form.reset();
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, [
    carData,
    modelsData,
    refetchCarDetails,
    refetchModels,
    locationsRefetch,
    form.reset,
  ]);

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

  if (carIsLoading || modelsLoading || locationsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );
  }
  if (!carData?.success || !modelsData?.success || !locationsData?.success)
    return (
      <Text>{carData?.error || modelsData?.error || locationsData?.error}</Text>
    );

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

              <Controller
                control={form.control} // From useForm()
                name="transmition"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => setTransmissionPickerVisible(true)}
                      style={styles.colorPickerTrigger}
                    >
                      <Text>{form.watch("transmition")}</Text>

                      <FontAwesome5
                        name="caret-down"
                        size={15}
                        color={"#777"}
                      />
                    </TouchableOpacity>
                    <CustomItemsPickerModal
                      isVisible={isTrasmissionPickerVisible}
                      items={transmitionString}
                      selectedItem={value}
                      onSelectItem={onChange}
                      onClose={() => setTransmissionPickerVisible(false)}
                    />
                  </View>
                )}
              />
            </View>
            {/* electric */}

            <View style={{ gap: 2 }}>
              <Text style={{ fontWeight: "800" }}>Electric</Text>

              <Controller
                control={form.control} // From useForm()
                name="electric"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => setElectricPickerVisible(true)}
                      style={styles.colorPickerTrigger}
                    >
                      <Text>{form.watch("electric")}</Text>

                      <FontAwesome5
                        name="caret-down"
                        size={15}
                        color={"#777"}
                      />
                    </TouchableOpacity>
                    <CustomItemsPickerModal
                      isVisible={isElectricPickerVisible}
                      items={electricString}
                      selectedItem={value}
                      onSelectItem={onChange}
                      onClose={() => setElectricPickerVisible(false)}
                    />
                  </View>
                )}
              />
            </View>
            {/* car type */}
            <View style={{ gap: 2 }}>
              <Text style={{ fontWeight: "800" }}>Car Type</Text>

              <Controller
                control={form.control} // From useForm()
                name="carType"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => setCarTypePickerVisible(true)}
                      style={styles.colorPickerTrigger}
                    >
                      <Text>{form.watch("carType")}</Text>

                      <FontAwesome5
                        name="caret-down"
                        size={15}
                        color={"#777"}
                      />
                    </TouchableOpacity>
                    <CustomItemsPickerModal
                      isVisible={isCarTypePickerVisible}
                      items={carTypesString}
                      selectedItem={value}
                      onSelectItem={onChange}
                      onClose={() => setCarTypePickerVisible(false)}
                    />
                  </View>
                )}
              />
            </View>
            {/* seats */}
            <Controller
              control={form.control} // From useForm()
              name="seats"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value.toString()}
                  setValue={onChange}
                  label="Seats"
                  numeric={true}
                />
              )}
            />
            {/* doors */}
            <Controller
              control={form.control} // From useForm()
              name="doors"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value.toString()}
                  setValue={onChange}
                  label="Doors"
                  numeric={true}
                />
              )}
            />
          </View>
        </FormWrapper>
      </View>
      {/* Rental details */}
      <View style={{ marginTop: 12 }}>
        <FormWrapper title="Rental details">
          {/* seats */}
          <Controller
            control={form.control} // From useForm()
            name="kmIncluded"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value.toString()}
                setValue={onChange}
                label="Km Included"
                numeric={true}
              />
            )}
          />
          {/* minimum renting hours */}
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control} // From useForm()
              name="minimumHours"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={(value || "").toString()}
                  setValue={onChange}
                  label="Minimum renting hours"
                  numeric={true}
                />
              )}
            />
          </View>
          {/* deposit */}
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control} // From useForm()
              name="deposite"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={(value || "").toString()}
                  setValue={onChange}
                  label="Deposit"
                  numeric={true}
                />
              )}
            />
          </View>
          {/* cool down time */}
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control} // From useForm()
              name="coolDown"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={(value || "").toString()}
                  setValue={onChange}
                  label="Cool down time (hours)"
                  numeric={true}
                />
              )}
            />
          </View>
          {/* Delivery fee */}
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control} // From useForm()
              name="deleviryFee"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={(value || "").toString()}
                  setValue={onChange}
                  label="Delivery fee"
                  numeric={true}
                />
              )}
            />
          </View>
        </FormWrapper>
      </View>

      {/* disable the car */}
      <View style={{ marginTop: 12 }}>
        <View
          style={{
            borderColor: Colors.border,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Controller
            control={form.control} // From useForm()
            name="disabled"
            render={({ field: { onChange, onBlur, value } }) => (
              <CheckBox
                checked={!!value}
                onPress={() => onChange(!value)}
                size={20}
                title={"Disable the car"}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={"checkbox-blank-outline"}
                checkedColor={Colors.mainDark}
              />
            )}
          />
          <Text
            style={{
              marginTop: -10,
              fontSize: 10,
              color: "gray",
              paddingLeft: 25,
              paddingBottom: 20,
            }}
          >
            If checked, the car will not show on the website.
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <FormWrapper title="Locations">
          <View style={{ flexDirection: "row", gap: 14 }}>
            <View>
              <Text style={{ fontWeight: "600" }}>Pick-up locations</Text>
              <Controller
                control={form.control} // From useForm()
                name="pickupLocations"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    {locationsData?.locations.map((location) => (
                      <CheckBox
                        key={location.id}
                        checked={value.includes(location.id)}
                        onPress={() => {
                          !value.includes(location.id)
                            ? onChange([...value, location.id])
                            : onChange(
                                value.filter((el) => el !== location.id)
                              );
                        }}
                        size={20}
                        title={location.name}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={"checkbox-blank-outline"}
                        checkedColor={Colors.mainDark}
                      />
                    ))}
                  </View>
                )}
              />
            </View>
            <View>
              <Text style={{ fontWeight: "600" }}>Drop-off locations</Text>
              <Controller
                control={form.control} // From useForm()
                name="dropoffLocations"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    {locationsData?.locations.map((location) => (
                      <CheckBox
                        key={location.id}
                        checked={value.includes(location.id)}
                        onPress={() => {
                          !value.includes(location.id)
                            ? onChange([...value, location.id])
                            : onChange(
                                value.filter((el) => el !== location.id)
                              );
                        }}
                        size={20}
                        title={location.name}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={"checkbox-blank-outline"}
                        checkedColor={Colors.mainDark}
                      />
                    ))}
                  </View>
                )}
              />
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
