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
import React from "react";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import CustomButton from "@/components/custom-button";
import { useLogin } from "@/hooks/login.hook";
import { useAuth } from "@/hooks/auth.hook";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Signin = () => {
  const { errors, handleSubmit, onSubmit, register, setValue, isSubmitting } =
    useLogin();
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) return <Redirect href="/(app)/(home)" />;

  return (
    <KeyboardAvoidingView
   
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1}}

    
    >
      <SafeAreaView
edges={['top']}
      style={styles.container}>
        <StatusBar  />
        <ScrollView
        style={{backgroundColor:Colors.mainDark}}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.first}>
            <Image
              source={require("../assets/images/logo.png")}
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
                <TextInput
                  placeholder="e-mail"
                  style={styles.input}
                  onChangeText={(text) =>
                    setValue("email", text, { shouldValidate: true })
                  }
                />
              </View>
              {errors.email && <Text>{errors.email.message}</Text>}
              <Text>Password</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 size={20} name="key" />
                <TextInput
                  placeholder="password"
                  style={styles.input}
                  onChangeText={(text) =>
                    setValue("password", text, { shouldValidate: true })
                  }
                  secureTextEntry
                />
              </View>
              {errors.password && <Text>{errors.password.message}</Text>}
              <Text
                style={{
                  alignSelf: "flex-end",
                  fontWeight: "500",
                  marginVertical: 4,
                }}
              >
                Forget password? Contact us
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
      </SafeAreaView>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    padding: 20,

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
