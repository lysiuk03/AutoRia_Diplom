import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import { z } from "zod";

export const PizzaSizePriceSchema = z.object({
  sizeId: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z
      .number()
      .int()
      .positive("Size must be a selected")
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Size must be a selected",
      }),
  ),
  price: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number()
      .positive("Price must be a positive number")
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Price must be a correct number",
      }),
  ),
});

export const PizzaCreateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),

  categoryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
    message: "Category is required",
  }),

  ingredientIds: z.array(z.number()).nonempty("Ingredients must cannot be empty"),

  sizes: z
    .array(PizzaSizePriceSchema)
    .refine(
      (sizes) => {
        return sizes.length > 0;
      },
      {
        message: "Sizes cannot be empty",
      },
    )
    .refine(
      (sizes) => {
        const sizeIds = sizes.map((size) => size.sizeId);
        const uniqueSizeIds = new Set(sizeIds);
        return sizeIds.length === uniqueSizeIds.size;
      },
      {
        message: "Sizes must be unique",
      },
    ),

  photos: z
    .any()
    .transform((files) => (files ? Array.from(files) : []))
    .refine((files: any[]) => files.length > 0, `Min photo count is 1.`)
    .refine((files: any[]) => files.length <= 5, `Max photo count is 5.`)
    .refine((files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(
      (files: any[]) => files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp files are accepted.",
    ),
});

export type PizzaCreateSchemaType = z.infer<typeof PizzaCreateSchema>;

export const PizzaEditSchema = z.object({
  id: z.number(),

  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),

  categoryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
    message: "Category is required",
  }),

  ingredientIds: z.array(z.number()).nonempty("Ingredients must cannot be empty"),

  sizes: z
    .array(PizzaSizePriceSchema)
    .refine(
      (sizes) => {
        return sizes.length > 0;
      },
      {
        message: "Sizes cannot be empty",
      },
    )
    .refine(
      (sizes) => {
        const sizeIds = sizes.map((size) => size.sizeId);
        const uniqueSizeIds = new Set(sizeIds);
        return sizeIds.length === uniqueSizeIds.size;
      },
      {
        message: "Sizes must be unique",
      },
    ),

  photos: z
    .any()
    .transform((files) => (files ? Array.from(files) : []))
    .refine((files: any[]) => files.length > 0, `Min photo count is 1.`)
    .refine((files: any[]) => files.length <= 5, `Max photo count is 5.`)
    .refine((files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(
      (files: any[]) => files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp files are accepted.",
    ),
});

export type PizzaEditSchemaType = z.infer<typeof PizzaEditSchema>;
