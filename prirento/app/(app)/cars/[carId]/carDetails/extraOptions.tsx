import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useCarExtraOptionsQuery } from "@/hooks/queries.hook";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native";
import { Link, usePathname, useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { ExtraOption } from "@/types";

import { useCarExtraOptions } from "@/hooks/car-extraOptions.hook";
import ExtraOptionCard from "@/components/extra-option-card";
import ExtraOptionsModal from "@/components/extra-options-modal";
import { useModal } from "@/hooks/modal-hook";
import { Ionicons } from "@expo/vector-icons";
import ErrorComponent from "@/components/error-component";
import { useAuth } from "@/hooks/auth.hook";
import LogoutComponent from "@/components/logout-component";

const ExtraOtions = () => {
  const pathname = usePathname();
  const carId = pathname.split("/")[2];
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
const { signout } = useAuth()
  const {
    data: extraOptions,
    isLoading: extraOptionsIsLoading,
    error: extraOptionsError,
    refetch: refetchExtraOptions,
  } = useCarExtraOptionsQuery(carId as string);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      // Await the refetch operations
      await Promise.all([refetchExtraOptions()]);
      queryClient.invalidateQueries({ queryKey: ["extraOptions", carId] });
    } catch (error) {
      console.error("Failed to refetch or reset form:", error);
    } finally {
      setRefreshing(false);
    }
  }, [extraOptions, refetchExtraOptions]);

  const { open, control } = useModal();
  const [extraOptionModal, setExttraOptionModal] = useState<
    ExtraOption | undefined
  >(undefined);


  if ((!extraOptions?.success && !!extraOptions?.logout))
  return <LogoutComponent />;

  return (
    <ScrollView
      style={{  backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 ,flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: Colors.mainDark,

          padding: 8,
          marginBottom: 20,
          borderRadius: 5,
          paddingVertical: 11,
          flexDirection: "row",
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          control(true);
          setExttraOptionModal(undefined);
        }}
      >
        <Ionicons name="add-circle-outline" color={"white"} size={20} />
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "600" }}
        >
          Add Extra Option
        </Text>
      </TouchableOpacity>
      {!!extraOptionsIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.mainDark} />
        </View>
      ) : (!extraOptions?.success || extraOptionsError ) ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          
          }}
        >
        <ErrorComponent text="Something went wrong!" onRefresh={onRefresh} />
        
          
        </View>
      ) : !extraOptions.extraOptions.length ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "500",
            color: "gray",
          }}
        >
          No Extra Options
        </Text>
      ) : (
        extraOptions.extraOptions.map((el) => (
          <ExtraOptionCard
            setOpen={() => control(true)}
            setExtraOptionModal={(el: ExtraOption) => setExttraOptionModal(el)}
            el={el}
            carId={carId}
            key={el.id}
          />
        ))
      )}
      <ExtraOptionsModal
        extraOption={extraOptionModal}
        isVisible={open}
        onClose={() => control(false)}
        carId={carId}
      />
    </ScrollView>
  );
};

export default ExtraOtions;
