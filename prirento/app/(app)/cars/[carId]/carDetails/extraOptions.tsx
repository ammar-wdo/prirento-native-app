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
import { usePathname, useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { ExtraOption } from "@/types";

import { useCarExtraOptions } from "@/hooks/car-extraOptions.hook";
import ExtraOptionCard from "@/components/extra-option-card";
import ExtraOptionsModal from "@/components/extra-options-modal";
import { useModal } from "@/hooks/modal-hook";

const ExtraOtions = () => {
  const pathname = usePathname();
  const carId = pathname.split("/")[2];
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

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
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
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
          borderRadius: 12,
          paddingVertical: 11,
        }}
        onPress={() => {
          control(true);
          setExttraOptionModal(undefined);
        }}
      >
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
      ) : !extraOptions?.success ? (
        <View>
          {" "}
          <Text>{extraOptions?.error}</Text>
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
