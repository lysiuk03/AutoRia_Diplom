import { createApi } from "@reduxjs/toolkit/query/react";
import { IPizzaSize } from "interfaces/pizza.ts";
import { createBaseQuery } from "utils/baseQuery.ts";

export const pizzaSizeApi = createApi({
  reducerPath: "pizzaSizeApi",
  baseQuery: createBaseQuery("sizes"),
  tagTypes: ["Sizes"],

  endpoints: (builder) => ({
    getAllPizzaSizes: builder.query<IPizzaSize[], void>({
      query: () => "getAll",
      providesTags: ["Sizes"],
    }),
  }),
});

export const { useGetAllPizzaSizesQuery } = pizzaSizeApi;
