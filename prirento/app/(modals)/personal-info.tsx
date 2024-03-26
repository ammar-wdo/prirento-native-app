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
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/custom-header";
import { useCompany } from "@/hooks/queries.hook";
import { useCompanyHook } from "@/hooks/company.hook";
import { Colors } from "@/constants/Colors";
import FormWrapper from "@/components/form-wrapper";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";

import CustomButton from "@/components/custom-button";
import { CheckBox } from "@rneui/base";
import { useModal } from "@/hooks/modal-hook";
import PasswordModal from "@/components/password-modal";
import ExitModal from "@/components/exit-modal";
import { useImageUploader } from "@/components/image-uploader";
import { ImageComponent } from "@/components/image-component-upload";

const PersonalInfo = () => {
  const { data, isLoading, error, refetch } = useCompany();

  const { form, onSubmit, out } = useCompanyHook({ company: data?.company });
  const { loading: LoadingLogo, pickImage: pickImageLogo } = useImageUploader({
    onUploadSuccess: (url: string) => form.setValue("logo", url),
  });
  const { loading, pickImage } = useImageUploader({
    onUploadSuccess: (url: string) =>
      form.setValue("gallary", [...form.watch("gallary"), url]),
  });
  const { setLogout, logout } = useModal();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetch()]);
      form.reset(data?.company);
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  const { passwordControl, passwordOpen } = useModal();
  useEffect(() => {
    if (data?.company) {
      form.reset(data.company);
    }
  }, [data?.company]);

  if (out)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{ padding: 12, backgroundColor: "orange", borderRadius: 9 }}
        >
          <Text style={{ color: "white", fontSize: 13, textAlign: "center" }}>
            You will be logged out after 10 seconds, Please login again with
            your new E-mail.
          </Text>
        </View>
      </View>
    );

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.mainDark} />
      </View>
    );

  if (!data?.success) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>{data?.error}</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => passwordControl(true)}
        >
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              borderWidth: 0.7,
              borderColor: Colors.secondaryGreen,
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="key-outline"
              color={Colors.secondaryGreen}
              size={20}
            />
            <Text style={{ color: Colors.secondaryGreen }}>
              Change Password
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => setLogout(true)}
        >
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              borderWidth: 0.7,
              borderColor: "red",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Ionicons name="exit-outline" color={"red"} size={20} />
          </View>
        </TouchableOpacity>
      </View>

      <FormWrapper title="Personal Details">
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input value={value} setValue={onChange} label="Email" />
          )}
        />
        {form.formState.errors.email && (
          <Text style={{ color: "red", fontSize: 10 }}>
            {form.formState.errors.email.message}
          </Text>
        )}
        <View style={{ marginTop: 12 }}>
          <Controller
            control={form.control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input value={value} setValue={onChange} label="Address" />
            )}
          />
          {form.formState.errors.address && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {form.formState.errors.address.message}
            </Text>
          )}
        </View>
      </FormWrapper>
      {/* contact details */}
      <View style={{ marginTop: 25 }}>
        <FormWrapper title="Contact Details">
          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                setValue={onChange}
                label="Phone Number"
                numeric={true}
              />
            )}
          />
          {form.formState.errors.phoneNumber && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {form.formState.errors.phoneNumber.message}
            </Text>
          )}
          <View style={{ marginTop: 12 }}>
            <Controller
              control={form.control}
              name="whatsApp"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  setValue={onChange}
                  label="Whats App Number"
                  numeric={true}
                />
              )}
            />
            {form.formState.errors.whatsApp && (
              <Text style={{ color: "red", fontSize: 10 }}>
                {form.formState.errors.whatsApp.message}
              </Text>
            )}
          </View>
        </FormWrapper>
      </View>
      {/* gallary and logo */}
      <View style={{ marginTop: 25 }}>
        <FormWrapper title="Gallary & Logo">
          <Text
            style={{
              fontWeight: "600",
              textTransform: "capitalize",
              marginVertical: 5,
            }}
          >
            Logo
          </Text>
          <Controller
            control={form.control}
            name="logo"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                {!!value ? (
                  <View
                    style={{
                      flex: 1,
                      aspectRatio: 2 / 1,
                      minWidth: 150,
                      position: "relative",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => form.setValue("logo", "")}
                      style={{
                        top: 0,
                        right: 0,
                        position: "absolute",
                        zIndex: 10,
                        padding: 3,
                        backgroundColor: "red",
                        borderRadius: 8,
                      }}
                    >
                      <Ionicons name="close" size={20} color={"white"} />
                    </TouchableOpacity>
                    <Image
                      style={{ width: "100%", height: "100%", borderRadius: 8 }}
                      source={{ uri: value }}
                    />
                  </View>
                ) : (
                  <Text
                    style={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      marginVertical: 5,
                      textAlign: "center",
                      fontSize: 25,
                      color: "gray",
                    }}
                  >
                    No Logo{" "}
                  </Text>
                )}
                  {LoadingLogo && <ActivityIndicator size={30} color={Colors.mainDark} />}
                <ImageComponent pickImage={pickImageLogo} />
              
                {form.formState.errors.logo && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {form.formState.errors.logo.message}
                  </Text>
                )}
              </View>
            )}
          />
          <View style={{ marginTop: 12 }}>
            <Text
              style={{
                fontWeight: "600",
                textTransform: "capitalize",
                marginVertical: 5,
              }}
            >
              Gallary
            </Text>
            <Controller
              control={form.control}
              name="gallary"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {!!value.length ? (
                    value.map((el, i) => (
                      <View
                        style={{
                          flex: 1,
                          aspectRatio: 2 / 1,
                          minWidth: 150,
                          position: "relative",
                        }}
                        key={el}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            form.setValue(
                              "gallary",
                              form.watch("gallary").filter((im) => im !== el)
                            )
                          }
                          style={{
                            top: 0,
                            right: 0,
                            position: "absolute",
                            zIndex: 10,
                            padding: 1,
                            backgroundColor: "red",
                            borderRadius: 8,
                          }}
                        >
                          <Ionicons name="close" size={20} color={"white"} />
                        </TouchableOpacity>
                        <Image
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 8,
                          }}
                          source={{ uri: el }}
                        />
                      </View>
                    ))
                  ) : (
                    <Text
                      style={{
                        fontWeight: "600",
                        textTransform: "capitalize",
                        marginVertical: 5,
                        textAlign: "center",
                        width: "100%",
                        fontSize: 25,
                        color: "gray",
                      }}
                    >
                      No Images
                    </Text>
                  )}
 {loading && <View style={{flexDirection:'row',justifyContent:'center',width:'100%'}}><ActivityIndicator  size={30} color={Colors.mainDark} /></View> }
                  <ImageComponent pickImage={pickImage} />
                 
                  {form.formState.errors.gallary && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.gallary.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
        </FormWrapper>
        <View style={{ marginTop: 25 }}>
          <FormWrapper title="Away Mode">
            <Controller
              control={form.control}
              name="away"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <CheckBox
                    checked={!!value}
                    onPress={() => {
                      onChange(!value);
                    }}
                    size={20}
                    title={"If checked, All cars will be blocked."}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={Colors.secondaryGreen}
                  />
                </View>
              )}
            />
          </FormWrapper>
        </View>
        <CustomButton
          disabled={form.formState.isSubmitting}
          title="Update"
          style={{ backgroundColor: Colors.mainDark, marginTop: 12 }}
          loading={form.formState.isSubmitting}
          onPress={form.handleSubmit(onSubmit)}
        />
      </View>
      <PasswordModal
        isVisible={passwordOpen}
        onClose={() => passwordControl(false)}
      />
      <ExitModal isVisible={logout} onClose={() => setLogout(false)} />
    </ScrollView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({});
