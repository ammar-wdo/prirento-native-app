import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


//car schema

const requiredString = z.string().min(1, "Required field");
const phoneNumberPattern =/^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;

const requiredNumber = z.preprocess((input) => {
  return input === "" ? undefined : Number(input);
}, z.number());

export const carTypes = [
  "SUV",
  "super_cars",
  "sports",
  "convertable",
  "classics",
  "business",
] as const;

export const carTypesString = [
  "SUV",
  "super_cars",
  "sports",
  "convertable",
  "classics",
  "business",
]
export const transmition = ["auto", "manual"] as const;
export const transmitionString = ["auto", "manual"]
export const electric = ["none", "fully_electric", "hybrid"] as const;
export const electricString = ["none", "fully_electric", "hybrid"] ;
export const carStatus = ["pending", "active"] as const;
export const carColors = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Brown",
  "Green",
  "Beige",
  "Gold",
  "Orange",
  "Yellow",
  "Purple",
  "Maroon",
  "Navy",
  "Charcoal",
  "Other",
] as const;

export const carColorsString = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Brown",
  "Green",
  "Beige",
  "Gold",
  "Orange",
  "Yellow",
  "Purple",
  "Maroon",
  "Navy",
  "Charcoal",
  "Other",
]

export const carColorsMapper :{[key:string]:string} = {
  Black: "#000000",
  White: "#FFFFFF",
  Silver: "#C0C0C0",
  Gray: "#808080",
  Blue: "#0000FF",
  Red: "#FF0000",
  Brown: "#A52A2A",
  Green: "#008000",
  Beige: "#F5F5DC",
  Gold: "#FFD700",
  Orange: "#FFA500",
  Yellow: "#FFFF00",
  Purple: "#800080",
  Maroon: "#800000",
  Navy: "#000080",
  Charcoal: "#36454F",
};

const colorSchema = z.object({
  colors: z.enum(carColors).refine((data) => carColors.includes(data), {
    message: "invalid electric option",
  }),
  interiorColor: z.enum(carColors).refine((data) => carColors.includes(data), {
    message: "invalid electric option",
  }),
});

const carTypeSchema = z
  .object({
    carType: z.enum(carTypes),
  })
  .refine((data) => carTypes.includes(data.carType), {
    message: "invalid electric option",
  });
const transmitionSchema = z
  .object({
    transmition: z.enum(transmition),
  })
  .refine((data) => transmition.includes(data.transmition), {
    message: "invalid electric option",
  });
const electricSchema = z
  .object({
    electric: z.enum(electric),
  })
  .refine((data) => electric.includes(data.electric), {
    message: "invalid electric option",
  });

const numericValues = z.object({
  seats: requiredNumber
    .refine((val) => val, "Required field")
    .refine(
      (value) => value >= 1 && value <= 7,
      "Minimum of 1 and maximum of 7"
    ),
  doors: requiredNumber
    .refine((val) => val, "Required field")
    .refine(
      (value) => value >= 2 && value <= 4,
      "Minimum of 2 and maximum of 4"
    ),
  deposite: requiredNumber
    .refine((val) => val, "Required field")
    .refine((val) => val > 0, "Enter positive value"),

  kmIncluded: requiredNumber
    .refine((val) => val, "Required field")
    .refine((val) => val > 0, "Enter positive value"),

  minimumHours: z.coerce
    .number()
    .positive({ message: "Enter positive value " })
    .optional()
    .or(z.literal(undefined)),
  deleviryFee: requiredNumber
    .refine((val) => val, "Required field")
    .refine((val) => val > 0, "Enter positive value"),
  coolDown: requiredNumber
    .refine((val) => val, "Required field")
    .refine((val) => val > 0, "Enter positive value"),
});

export const carSchema = z
  .object({
    description: requiredString,
    year: requiredString
      .refine((data) => /^\d+$/.test(data), {
        message: "Year must be a number.",
      })
      .refine((data) => data.length === 4, {
        message: "Year must be exactly 4 digits.",
      }),

    engine: requiredString,

    gallary: z
      .array(requiredString)
      .min(1, "Upload at least 1 image")
      .max(6, "Maximum of 6 images allowed"),

    additionalFeatures: z
      .array(z.object({ title: z.string(), icon: z.string() }))
      .optional(),
    disabled: z.boolean().optional(),
    pickupLocations: z.array(z.string()).min(1, "Pick at least one location"),
    dropoffLocations: z.array(z.string()).min(1, "Pick at least one location"),

    carModelId: requiredString,
  })

  .and(carTypeSchema)
  .and(transmitionSchema)
  .and(electricSchema)

  .and(colorSchema)
  .and(numericValues);


  export const carPricingsSchema = z.object({
    pricings: z
      .array(z.coerce.number())
      .refine((pricings) => !pricings.includes(0), {
        message: "Pricings cannot include zero",
      })
      .refine((pricings) => !pricings.some((val) => val < 0), {
        message: "Negative values not allowed",
      }),
    hourPrice: requiredNumber.refine((val) => val > 0, "Enter positive value"),
  });


  export type CarDetail = z.infer<typeof carSchema>
  export type ComingCar = Omit<CarDetail, 'pickupLocations' | 'dropoffLocations'> & {pickupLocations:{id:string,name:string}[],dropoffLocations:{id:string,name:string}[],pricings:number[],hourlyPrice:number}