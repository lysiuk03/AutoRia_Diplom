import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategory, ICategoryCreate, ICategoryEdit, ICategoryPagedRequest } from "interfaces/category.ts";
import { IPagedDataResponse } from "interfaces/index.ts";
import { createBaseQuery } from "utils/baseQuery.ts";
import { createQueryString } from "utils/createQueryString.ts";
import {
  generateCategoryCreateFormData,
  generateCategoryEditFormData,
} from "utils/formData/category/generaneCategoryFormData.ts";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: createBaseQuery("categories"),
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], void>({
      query: () => "getAll",
      providesTags: ["Categories"],
    }),

    getPagedCategories: builder.query<IPagedDataResponse<ICategory>, ICategoryPagedRequest>({
      query: (params) => {
        const queryString = createQueryString(params as Record<string, any>);
        return `getPage?${queryString}`;
      },
      providesTags: ["Categories"],
    }),

    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Categories", id: arg }],
    }),

    createCategory: builder.mutation<void, ICategoryCreate>({
      query: (category) => {
        const formData = generateCategoryCreateFormData(category);

        return {
          url: "create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Categories"],
    }),

    editCategory: builder.mutation<void, ICategoryEdit>({
      query: (category) => {
        const formData = generateCategoryEditFormData(category);
        return {
          url: "update",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useGetPagedCategoriesQuery,
} = categoryApi;
