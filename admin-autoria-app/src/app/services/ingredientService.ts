import { createApi } from "@reduxjs/toolkit/query/react";
import { IIngredient, IIngredientCreate, IIngredientEdit } from "interfaces/ingredient.ts";
import { createBaseQuery } from "utils/baseQuery.ts";
import {
  generateIngredientCreateFormData,
  generateIngredientEditFormData,
} from "utils/formData/ingredient/generateIngredientCreateFormData.ts";

export const ingredientApi = createApi({
  reducerPath: "ingredientApi",
  baseQuery: createBaseQuery("ingredients"),
  tagTypes: ["Ingredients"],

  endpoints: (builder) => ({
    getAllIngredients: builder.query<IIngredient[], void>({
      query: () => "getAll",
      providesTags: ["Ingredients"],
    }),

    getIngredientById: builder.query<IIngredient, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Ingredients", id: arg }],
    }),

    createIngredient: builder.mutation<void, IIngredientCreate>({
      query: (ingredient) => {
        const formData = generateIngredientCreateFormData(ingredient);

        return {
          url: "create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Ingredients"],
    }),

    editIngredient: builder.mutation<void, IIngredientEdit>({
      query: (ingredient) => {
        const formData = generateIngredientEditFormData(ingredient);
        return {
          url: "update",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Ingredients"],
    }),

    deleteIngredient: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ingredients"],
    }),
  }),
});

export const {
  useGetAllIngredientsQuery,
  useDeleteIngredientMutation,
  useGetIngredientByIdQuery,
  useCreateIngredientMutation,
  useEditIngredientMutation,
} = ingredientApi;
