import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Company, companySchema } from "@/schemas";

import { useEffect, useState } from "react";
import { poster } from "@/lib/utils";
import { GET_COMPANY } from "@/links";
import { useAuth } from "./auth.hook";
import { Alert } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  company: Company | undefined;
};

type DayOpeningTimes = {
  openTime: string;
  closeTime: string;
  closed: boolean;
};

// Define the overall structure for the default opening times
type OpeningTimes = {
  [key: string]: DayOpeningTimes;
};

// Define the structure for the dropdown status state
export type DropdownStatus = {
  [day: string]: {
    openTimeDropdown: boolean;
    closeTimeDropdown: boolean;
    closed: boolean;
  };
};

export const daysOrder: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const useCompanyHook = ({ company }: Props) => {
  const [logOut, setLogOut] = useState(false);

  const defaultOpeningTimes = {
    Monday: { openTime: "09:00", closeTime: "17:00", closed: false },
    Tuesday: { openTime: "09:00", closeTime: "17:00", closed: false },
    Wednesday: { openTime: "09:00", closeTime: "17:00", closed: false },
    Thursday: { openTime: "09:00", closeTime: "17:00", closed: false },
    Friday: { openTime: "09:00", closeTime: "17:00", closed: false },
    Saturday: { openTime: "09:00", closeTime: "17:00", closed: false },
    Sunday: { openTime: "09:00", closeTime: "17:00", closed: false },
  };

  const [dropdownStatus, setDropdownStatus] = useState<DropdownStatus>(
    Object.keys(defaultOpeningTimes).reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          openTimeDropdown: false,
          closeTimeDropdown: false,
          closed: false,
        },
      }),
      {} as DropdownStatus
    ) // Type assertion for the initial state
  );

  const toggleDropdown = (
    day: string,
    dropdownType: "openTimeDropdown" | "closeTimeDropdown"
  ) => {
    setDropdownStatus((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [dropdownType]: !prevState[day][dropdownType],
      },
    }));
  };

  type OpeneingsTime = typeof defaultOpeningTimes;

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      email: company?.email || "",
      password: company?.password || "",
      newPassword: "",
      address: company?.address || "",
      phoneNumber: company?.phoneNumber || "",
      whatsApp: company?.whatsApp || "",
      logo: company?.logo || "",
      gallary: company?.gallary || [],
      away: company?.away || false,

      openingTime:
        (company?.openingTime as unknown as OpeneingsTime) ||
        defaultOpeningTimes,
    },
  });

  const [out, setOut] = useState(false)
  const { user, signout } = useAuth();
  const queryClient = useQueryClient()
  async function onSubmit(values: z.infer<typeof companySchema>) {
    try {
      const res = await poster<{
        success: boolean;
        logout?: boolean;
        error?: string;
      }>(GET_COMPANY, values, user?.token);
      console.log(res);
      if (res.success) {
        queryClient.invalidateQueries({queryKey:['company']})
        if (!!res.logout) {
        setOut(true)
          setTimeout(()=>signout(), 10000);
        }else{
            Alert.alert("Successfully Updated")
        }

      }
    } catch (error) {
      console.log(error);
    }
  }

  const setter = (day: Day, type: "openTime" | "closeTime", value: string) => {
    form.setValue(`openingTime.${day}.${type}`, value);
  };

  const toggleClose = (day: Day) => {
    const closedValue = form.watch(`openingTime.${day}.closed`);

    form.setValue(`openingTime.${day}.closed`, !closedValue);
  };

  return {
    form,
    onSubmit,

    out,

    dropdownStatus,
    toggleDropdown,
    setter,
    toggleClose,
  };
};
