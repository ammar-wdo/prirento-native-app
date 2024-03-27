import { useCarExtraOptions } from "@/hooks/car-extraOptions.hook";
import { carColorsMapper } from "@/schemas";
import { CarAvailability, ExtraOption } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import DatePicker from "react-native-modern-datepicker";

import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Input from "./Input";
import { Image } from "react-native";

import CustomButton from "./custom-button";

import { useImageUploader } from "./image-uploader";
import { useCarAvailability } from "@/hooks/availability-hook";
import { convertDateToISOString, formatDate, getTime } from "@/lib/utils";
import ChooseTimeModal from "./choose-time-modal";
import { Colors } from "@/constants/Colors";
import CalendarModal from "./calendar-modal";
import EndCalendarModal from "./endCalendarModal";

interface CustomColorPickerModalProps {
  isVisible: boolean;
  carId: string;
  carAvailability: CarAvailability | undefined;
  onClose: () => void;
}
const CarAvailabilitysModal: React.FC<CustomColorPickerModalProps> = ({
  isVisible,
  carAvailability,
  carId,

  onClose,
}) => {
  const { form, onSubmit } = useCarAvailability(carAvailability, carId);

  useEffect(() => {
    if (carAvailability) {
      form.reset({
        label: carAvailability.label,
        startDate: convertDateToISOString(
          new Date(carAvailability?.startDate || "")
        ),
        endDate: convertDateToISOString(
          new Date(carAvailability?.endDate || "")
        ),
        startTime: getTime(new Date(carAvailability.startDate)),
        endTime: getTime(new Date(carAvailability.endDate)),
      });
    } else {
      form.reset({
        label: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
      });
    }
  }, [carAvailability]);

  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  useLayoutEffect(() => {
    setStartDateOpen(false);
    setEndDateOpen(false);
  }, []);

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              {carAvailability
                ? "Edit " + carAvailability.label || "availability"
                : "Add New Car Block Date"}
            </Text>

            <View style={{ marginTop: 12, flex: 1 }}>
              <Controller
                control={form.control} // From useForm()
                name="label"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value || ""}
                    setValue={onChange}
                    label="Label"
                  />
                )}
              />
              {form.formState.errors.label && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {form.formState.errors.label.message}
                </Text>
              )}

              {/* time */}
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "700" }}> Start Time</Text>
                  <Controller
                    control={form.control} // From useForm()
                    name="startTime"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TouchableOpacity
                        onPress={() => setStartTimeOpen(true)}
                        style={{
                          padding: 8,
                          flexDirection: "row",
                          gap: 12,
                          alignItems: "center",
                        }}
                      >
                        <Text>{!!value ? value : "Choose time"}</Text>
                        <Ionicons name="chevron-down" />
                      </TouchableOpacity>
                    )}
                  />
                  {form.formState.errors.startTime && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.startTime.message}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={{ fontWeight: "700" }}>End Time</Text>
                  <Controller
                    control={form.control} // From useForm()
                    name="endTime"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TouchableOpacity
                        onPress={() => setEndTimeOpen(true)}
                        style={{
                          padding: 8,
                          flexDirection: "row",
                          gap: 12,
                          alignItems: "center",
                        }}
                      >
                        <Text>{!!value ? value : "Choose time"}</Text>
                        <Ionicons name="chevron-down" />
                      </TouchableOpacity>
                    )}
                  />
                  {form.formState.errors.endTime && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.endTime.message}
                    </Text>
                  )}
                </View>
              </View>

              {/* date */}
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "700" }}>Start Date</Text>
                  <Controller
                    control={form.control} // From useForm()
                    name="startDate"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View>
                        <TouchableOpacity
                          onPress={() => setStartDateOpen(true)}
                          style={{
                            padding: 8,
                            flexDirection: "row",
                            gap: 12,
                            alignItems: "center",
                          }}
                        >
                          <Text>
                            {!!value
                              ? formatDate(new Date(value), "en-GB", {
                                  timeZone: "UTC",
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })
                              : "Choose Date"}
                          </Text>
                          <Ionicons name="calendar-clear-outline" />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                  {form.formState.errors.startDate && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.startDate.message}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={{ fontWeight: "700" }}>End Date</Text>
                  <Controller
                    control={form.control} // From useForm()
                    name="endDate"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TouchableOpacity
                        onPress={() => setEndDateOpen(true)}
                        style={{
                          padding: 8,
                          flexDirection: "row",
                          gap: 12,
                          alignItems: "center",
                        }}
                      >
                        <Text>
                          {!!value
                            ? formatDate(new Date(value), "en-GB", {
                                timeZone: "UTC",
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                            : "Choose Date"}
                        </Text>
                        <Ionicons name="calendar-clear-outline" />
                      </TouchableOpacity>
                    )}
                  />
                  {form.formState.errors.endDate && (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {form.formState.errors.endDate.message}
                    </Text>
                  )}
                </View>
              </View>

              <CustomButton
                loading={form.formState.isSubmitting}
                style={{ backgroundColor: Colors.mainDark, marginTop: "auto" }}
                onPress={form.handleSubmit(onSubmit)}
                title={carAvailability ? "Update" : "Create"}
              />
            </View>
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <CalendarModal
        isVisible={startDateOpen}
        onClose={() => setStartDateOpen(false)}
        date={form.watch("startDate")}
        onChange={(val) => form.setValue("startDate", val)}
      />
         <EndCalendarModal
        isVisible={endDateOpen}
        onClose={() => setEndDateOpen(false)}
        date={form.watch("endDate")}
        onChange={(val) => form.setValue("endDate", val)}
      />
      <ChooseTimeModal
        isVisible={startTimeOpen}
        onClose={() => setStartTimeOpen(false)}
        selectTime={(val: string) => form.setValue("startTime", val)}
      />
      <ChooseTimeModal
        isVisible={endTimeOpen}
        onClose={() => setEndTimeOpen(false)}
        selectTime={(val: string) => form.setValue("endTime", val)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalContent: {
    width: "90%",
    height: "85%",
    position: "relative",

    overflow: "scroll",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  closeButton: {
    alignSelf: "center",
    padding: 12,
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default CarAvailabilitysModal;
