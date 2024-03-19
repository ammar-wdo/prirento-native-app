import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, usePathname } from "expo-router";
import { useCarExtraOptionsDetailsQuery } from "@/hooks/queries.hook";
import { useCarExtraOptions } from "@/hooks/car-extraOptions.hook";
import { useQueryClient } from "@tanstack/react-query";

import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import ImageUploader from "@/components/image-uploader";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/custom-button";

const OptionId = () => {
  const pathname = usePathname();
  const carId = pathname.split("/")[2];

  const { optionId } = useLocalSearchParams();

  const { data, isLoading, error, refetch } = useCarExtraOptionsDetailsQuery(
    carId,
    optionId as string
  );

  const { form, onSubmit } = useCarExtraOptions(data?.extraOption);
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetch()]);
      queryClient.invalidateQueries({ queryKey: ["extraOption", optionId] });
      form.reset(data?.extraOption);
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, [data?.extraOption, refetch, form.reset]);

  useEffect(() => {
    if (data?.extraOption) {
      form.reset(data?.extraOption);
    }
  }, [data?.extraOption]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Stack.Screen
        options={{
          title:
            optionId === "new" ? "Add new Extra Option" : "Edit Extra Option",
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />

      {!!isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.mainDark} />
        </View>
      ) : !data?.success ? (
        <View>
          <Text>{data?.error}</Text>
        </View>
      ) : (
        <View>
          <Controller
            control={form.control}
            name="label"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input value={value} setValue={onChange} label="Label" />
            )}
          />
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input value={value} setValue={onChange} label="Description" />
              )}
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control}
              name="price"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={(value || "").toString()}
                  setValue={onChange}
                  label="Price"
                  numeric={true}
                />
              )}
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control}
              name="logo"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{}}>
                  <Text style={{ fontWeight: "800" }}>Logo</Text>
                  <ImageUploader onUploadSuccess={onChange} />

                  <Image
                    source={{
                      uri:
                        value ||
                        "../../../../../../assets/images/placeholder.jpeg",
                    }}
                    style={{
                      width: "100%",
                      aspectRatio: 2 / 1,
                      marginTop: 12,
                      borderWidth: 0.7,
                      borderColor: Colors.border2,
                      borderRadius: 8,
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            />
          </View>

          <CustomButton title={data?.extraOption ? 'Update' : 'Create'} loading={form.formState.isSubmitting} onPress={form.handleSubmit(onSubmit)} style={{backgroundColor:Colors.mainDark,marginTop:15}}/>
        </View>
      )}
    </ScrollView>
  );
};

export default OptionId;

const styles = StyleSheet.create({});
