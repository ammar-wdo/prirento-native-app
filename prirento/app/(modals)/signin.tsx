import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,

  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Controller } from 'react-hook-form'
import React from "react";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import CustomButton from "@/components/custom-button";
import { useLogin } from "@/hooks/login.hook";
import { useAuth } from "@/hooks/auth.hook";
import { Link, Redirect, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Signin = () => {
  const { errors, handleSubmit, onSubmit, register, setValue, isSubmitting,touchedFields ,control} =
    useLogin();
  const { user, loading } = useAuth();

  if (!!loading) return null;

  if (!!user) return <Redirect href="/(app)" />;


  SplashScreen.hideAsync()

  return (
    
    <KeyboardAvoidingView
    contentContainerStyle={{flex:1}}
   keyboardVerticalOffset={35}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1}}

    >

    
        <ScrollView
        style={{backgroundColor:Colors.mainDark,flex:1}}
          contentContainerStyle={styles.scrollViewContent}
          
        >
          <View style={styles.first}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.second}>
            <View>
              <Text style={styles.title}>Welcome</Text>
              <Text style={{ fontSize: 16, color: "gray" }}>
                Please enter your login information below to access your account
              </Text>
            </View>
            <View style={styles.inputsWrapper}>
              <Text>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons size={20} name="mail" />
                <Controller
  control={control} // this comes from useForm
  name="email"
  render={({ field: { onChange, onBlur, value, ref } }) => (
    <TextInput
    
      placeholder="Email"
      style={styles.input}
      onChangeText={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
    />
  )}
/>
              </View>
              {errors.email && touchedFields.email && <Text style={{color:'red'}}>{errors.email.message}</Text>}
              <Text>Password</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 size={20} name="key" />
                <Controller
  control={control} // this comes from useForm
  name="password"
  render={({ field: { onChange, onBlur, value, ref } }) => (
    <TextInput
    secureTextEntry
      placeholder="Password"
      style={styles.input}
      onChangeText={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
    />
  )}
/>
              </View>
              {errors.password && touchedFields.password && <Text style={{color:'red'}}>{errors.password.message}</Text>}
              <Text
                style={{
                  alignSelf: "flex-end",
                  fontWeight: "500",
                  marginVertical: 4,
                }}
              >
                Forget password? <Link href={'https://www.prirento.ae/contact-us'}>Contact us</Link>
              </Text>

              <CustomButton
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                title="Login"
                style={{ backgroundColor: Colors.mainDark }}
                textStyle={{ fontWeight: "600" }}
              />
            </View>
          </View>
        </ScrollView>
   
    </KeyboardAvoidingView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  
  container: {
    display: "flex",
    justifyContent: "center",
    

    flex: 1,

  },
  first: {
    height: "40%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
 
  },
  second: {


    width: "100%",
flex:1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

    padding: 20,
    paddingBottom:60

  },

  input: {
    backgroundColor: "white",

    flex: 1,
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 40,
    fontWeight: "600",
  },
  inputsWrapper: {
    flex: 1,
    display: "flex",
    width: "100%",
    marginTop: 40,
    gap: 12,
  },
  inputWrapper: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    width: "100%",
    display: "flex",
    gap: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewContent: {
    backgroundColor:Colors.mainDark,
    flexGrow: 1,
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically if content is smaller than the screen

  },
});
