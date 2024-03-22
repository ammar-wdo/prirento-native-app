import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { carExtraOptionsSchema, passwordSchema } from "@/schemas";

import { ExtraOption } from "@/types";
import { fetcher, poster } from "@/lib/utils";
import {
  CHANGE_PASSWORD,
  GET_CAR_EXTRA_OPTIONS,
  GET_CAR_EXTRA_OPTIONS_DETAILS,
} from "@/links";
import { useAuth } from "./auth.hook";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "./modal-hook";
import { useEffect, useState } from "react";

export const usePassword = () => {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [error, setError] = useState("");
  const [passwordEye, setPasswordEye] = useState(true);
  const [newPasswordEye, setNewPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);

  useEffect(() => {
    form.register("password");
    form.register("newPassword");
    form.register("newPassword");
  }, [form.register]);

  const router = useRouter();

  const { passwordControl } = useModal();

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      const res = await poster<{ success: boolean; error?: string }>(
        CHANGE_PASSWORD,
        values,
        user?.token
      );

      if (!res.success) {
        setError(res.error as string);
      } else {
        Alert.alert("Successfully Updated");
        passwordControl(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    form,
    onSubmit,
    error,
    setError,
    passwordEye,
    newPasswordEye,
    confirmPasswordEye,
    setPasswordEye,
    setNewPasswordEye,
    setConfirmPasswordEye,
  };
};
