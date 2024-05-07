import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";

import FormWrapper from "@/components/form-wrapper";
import { useAddCar } from "@/hooks/add-car.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useLocatonsQuery, useModelsQuery } from "@/hooks/queries.hook";
import { Controller } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/custom-button";
import { CheckBox } from "@rneui/base";
import Input from "@/components/Input";
import CustomItemsPickerModal from "@/components/custom-color-picker";
import {
  carColorsMapper,
  carColorsString,
  carTypesString,
  electricString,
  transmitionString,
} from "@/schemas";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import CustomModePickerModal from "@/components/model-picker";
import { useImageUploader } from "@/components/image-uploader";
import { ImageComponent } from "@/components/image-component-upload";
import ErrorComponent from "@/components/error-component";

const index = () => {
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
  const clientQuery = useQueryClient();
  const {
    form,
    onSubmit,

    isCarTypePickerVisible,
    isColorPickerVisible,
    isElectricPickerVisible,
    isInteriorColorPickerVisible,
    isModelPickerVisible,
    isTrasmissionPickerVisible,
    refreshing,
    setCarTypePickerVisible,
    setColorPickerVisible,
    setElectricPickerVisible,
    setInteriorColorPickerVisible,
    setModelPickerVisible,
    setRefreshing,
    setTransmissionPickerVisible,
  } = useAddCar();
const {loading,pickImage} = useImageUploader({onUploadSuccess:(url:string)=>form.setValue('gallary',[...form.watch('gallary'),url])})
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetchModels(), locationsRefetch()]);

      form.reset();
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, [modelsData, refetchModels, locationsRefetch, form.reset]);

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


  if(modelsLoading || locationsLoading) return <ScrollView   refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  contentContainerStyle={{flex: 1,paddingBottom:20,alignItems:'center',justifyContent:'center'}}
  >
  <ActivityIndicator size="large" color={Colors.mainDark} />
  </ScrollView>

  if(!modelsData?.success || !locationsData?.success || modelsError || locationsError ) return (
    <ScrollView   refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    contentContainerStyle={{flex: 1,paddingBottom:20,alignItems:'center',justifyContent:'center'}}
    >
   <ErrorComponent text="Something went wrong!" onRefresh={onRefresh} />
    </ScrollView>
  )

  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}} style={{ flex:1, backgroundColor: "white", padding: 12 }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    
     
   
          <FormWrapper title="Basic Informations">
            <View style={{ gap: 12 }}>
              <View style={{ gap: 2 }}>
                <Text style={{ fontWeight: "700" }}>Car Model</Text>

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
                            sortedModels?.find((el) => el.id === value)
                              ?.carBrand.brand
                          }{" "}
                          {sortedModels?.find((el) => el.id === value)?.name}
                        </Text>
                        {!!value && (
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 100,
                          
                            }}
                          ></View>
                        )}
                        <FontAwesome5
                          name="caret-down"
                          size={15}
                          color={"#777"}
                        />
                      </TouchableOpacity>
                      <CustomModePickerModal
                        isVisible={isModelPickerVisible}
                        items={sortedModels!} // Your colors array
                        selectedItem={value}
                        onSelectItem={onChange}
                        onClose={() => setModelPickerVisible(false)}
                      />
                    </View>
                  )}
                />
                {form.formState.errors.carModelId && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.carModelId.message}
                  </Text>
                )}
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
              {form.formState.errors.year && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.year.message}
                </Text>
              )}

              <Controller
                control={form.control} // From useForm()
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    setValue={onChange}
                    label="Description"
                  />
                )}
              />
              {form.formState.errors.description && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.description.message}
                </Text>
              )}
            </View>
          </FormWrapper>

          {/* apperance */}
          <View style={{ marginTop: 12 }}>
            <FormWrapper title="Appearance">
              {/* car colr */}
              <View style={{ gap: 2 }}>
                <Text style={{ fontWeight: "700" }}>Car Color</Text>

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
                              // backgroundColor: carColorsMapper[value],
                            }}
                          ></View>
                        )}
                        <FontAwesome5
                          name="caret-down"
                          size={15}
                          color={"#777"}
                        />
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
                {form.formState.errors.colors && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.colors.message}
                  </Text>
                )}
              </View>
              {/* car interior color */}
              <View style={{ gap: 2,marginTop:12 }}>
                <Text style={{ fontWeight: "700" }}>Car Interior Color {form.watch('interiorColor')}</Text>

                <Controller
                  control={form.control} // From useForm()
                  name="interiorColor"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => setInteriorColorPickerVisible(true)}
                        style={styles.colorPickerTrigger}
                      >
                        <Text>{form.watch("interiorColor") || "Select Color"}</Text>
                        {!!value && (
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 100,
                              // backgroundColor: carColorsMapper[value],
                            }}
                          ></View>
                        )}
                        <FontAwesome5
                          name="caret-down"
                          size={15}
                          color={"#777"}
                        />
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
                {form.formState.errors.interiorColor && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.interiorColor.message}
                  </Text>
                )}
              </View>
              {/* Gallery */}
              <View style={{ gap: 2,marginTop:12 }}>
                <Text style={{ fontWeight: "700" }}>Gallery</Text>

                <Controller
                  control={form.control} // From useForm()
                  name="gallary"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ width: "100%" }}>
                      <ImageComponent pickImage={pickImage}/>
                      {loading && <ActivityIndicator size={30} color={Colors.mainDark} />}
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
                {form.formState.errors.gallary && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.gallary.message}
                  </Text>
                )}
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
                {form.formState.errors.engine && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.engine.message}
                  </Text>
                )}

                {/* transmission */}
                <View style={{ gap: 2 }}>
                  <Text style={{ fontWeight: "700" }}>Transmission</Text>

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
                  {form.formState.errors.transmition && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.transmition.message}
                    </Text>
                  )}
                </View>
                {/* electric */}

                <View style={{ gap: 2 }}>
                  <Text style={{ fontWeight: "700" }}>Electric</Text>

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
                  {form.formState.errors.electric && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.electric.message}
                    </Text>
                  )}
                </View>
                {/* car type */}
                <View style={{ gap: 2 }}>
                  <Text style={{ fontWeight: "700" }}>Car Type</Text>

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
                  {form.formState.errors.carType && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.carType.message}
                    </Text>
                  )}
                </View>
                {/* seats */}
                <Controller
                  control={form.control} // From useForm()
                  name="seats"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={(value || '').toString()}
                      setValue={onChange}
                      label="Seats"
                      numeric={true}
                    />
                  )}
                />
                {form.formState.errors.seats && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.seats.message}
                  </Text>
                )}
                {/* doors */}
                <Controller
                  control={form.control} // From useForm()
                  name="doors"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={(value || '').toString()}
                      setValue={onChange}
                      label="Doors"
                      numeric={true}
                    />
                  )}
                />
                {form.formState.errors.doors && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.doors.message}
                  </Text>
                )}
              </View>
            </FormWrapper>
          </View>
          {/* Rental details */}
          <View style={{ marginTop: 12 }}>
            <FormWrapper title="Rental details">
              {/* km Included */}
              <Controller
                control={form.control} // From useForm()
                name="kmIncluded"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={(value || '').toString()}
                    setValue={onChange}
                    label="Km Included"
                    numeric={true}
                  />
                )}
              />
              {form.formState.errors.kmIncluded && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.kmIncluded.message}
                </Text>
              )}
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
                {form.formState.errors.minimumHours && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.minimumHours.message}
                  </Text>
                )}
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
                {form.formState.errors.deposite && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.deposite.message}
                  </Text>
                )}
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
                {form.formState.errors.coolDown && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.coolDown.message}
                  </Text>
                )}
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
                {form.formState.errors.deleviryFee && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.deleviryFee.message}
                  </Text>
                )}
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
              <View style={{ flexDirection: "column", gap: 20 }}>
                <View>
                  <Text style={{ fontWeight: "600" }}>Pick-up locations</Text>
                  <Controller
                    control={form.control} // From useForm()
                    name="pickupLocations"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
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
                            checkedColor={Colors.secondaryGreen}
                            textStyle={{ fontSize: 11 }}
                          />
                        ))}
                      </View>
                    )}
                  />
                  {form.formState.errors.pickupLocations && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.pickupLocations.message}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={{ fontWeight: "600" }}>Drop-off locations</Text>
                  <Controller
                    control={form.control} // From useForm()
                    name="dropoffLocations"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
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
                            checkedColor={Colors.secondaryGreen}
                            textStyle={{ fontSize: 11 }}
                          />
                        ))}
                      </View>
                    )}
                  />
                  {form.formState.errors.dropoffLocations && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.dropoffLocations.message}
                    </Text>
                  )}
                </View>
              </View>
            </FormWrapper>
          </View>
          <CustomButton
            loading={form.formState.isSubmitting}
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            title="Create"
            style={{ backgroundColor: Colors.secondaryGreen, marginTop: 12 }}
            textStyle={{ fontWeight: "600" }}
          />
       
     
 
    </ScrollView>
  );
};

export default index;
const styles = StyleSheet.create({
  colorPickerTrigger: {
    padding: 10,
    marginTop: 10,
    width: "100%",
    borderWidth: 0.7,
    borderColor: Colors.border2,
    borderRadius: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
