import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import { z } from "zod";

export const IngredientCreateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),

  image: z
    .any()
    .transform((files) => (files ? Array.from(files) : []))
    .refine((files: any[]) => files.length > 0, `Min photo count is 1.`)
    .refine((files: any[]) => files.length <= 1, `Max photo count is 1.`)
    .refine((files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(
      (files: any[]) => files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp files are accepted.",
    ),
});

export type IngredientCreateSchemaType = z.infer<typeof IngredientCreateSchema>;

export const IngredientEditSchema = z.object({
  id: z.number(),

  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),

  image: z
    .any()
    .nullable()
    .transform((files) => (files ? Array.from(files) : []))
    .refine((files: any[]) => files.length === 0 || files.length === 1, "You can only upload one image.")
    .refine(
      (files: any[]) => files.length === 0 || files.every((file) => file.size <= 5 * 1024 * 1024), // 5MB max file size
      "Max file size is 5MB.",
    )
    .refine(
      (files: any[]) =>
        files.length === 0 ||
        files.every((file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type.toLowerCase())),
      "Only .jpg, .jpeg, .png, and .webp files are accepted.",
    ),
});

export type IngredientEditSchemaType = z.infer<typeof IngredientEditSchema>;
