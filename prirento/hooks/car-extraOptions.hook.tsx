import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { carExtraOptionsSchema } from "@/schemas";


import { ExtraOption } from "@/types";


export const useCarExtraOptions = (extraOption : ExtraOption | undefined) => {


    console.log('Extra Option',extraOption)
  const form = useForm<z.infer<typeof carExtraOptionsSchema>>({
    resolver: zodResolver(carExtraOptionsSchema),
    defaultValues: {
      label: extraOption?.label || "",
      description: extraOption?.description || "",
      price: extraOption?.price || undefined,

      logo: extraOption?.logo || "",
    },
  });


  async function onSubmit(values: z.infer<typeof carExtraOptionsSchema>) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  return {
    form,
    onSubmit,
  };
};
