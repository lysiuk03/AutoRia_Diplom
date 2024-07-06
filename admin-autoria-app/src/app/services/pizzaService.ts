import { createApi } from "@reduxjs/toolkit/query/react";
import { IPagedDataResponse } from "interfaces/index.ts";
import { IPizza, IPizzaCreate, IPizzaEdit, IPizzaPagedRequest } from "interfaces/pizza.ts";
import { createBaseQuery } from "utils/baseQuery.ts";
import { createQueryString } from "utils/createQueryString.ts";
import { generatePizzaCreateFormData, generatePizzaEditFormData } from "utils/formData/pizza/generatePizzaCreateFormData.ts";

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: createBaseQuery("pizza"),
  tagTypes: ["Pizzas"],

  endpoints: (builder) => ({
    getAllPizzas: builder.query<IPizza[], void>({
      query: () => "getAll",
      providesTags: ["Pizzas"],
    }),

    getPizzaById: builder.query<IPizza, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Pizzas", id: arg }],
    }),

    getPagedPizzas: builder.query<IPagedDataResponse<IPizza>, IPizzaPagedRequest>({
      query: (params) => {
        const queryString = createQueryString(params as Record<string, any>);
        return `getPage?${queryString}`;
      },
      providesTags: ["Pizzas"],
    }),

    createPizza: builder.mutation<void, IPizzaCreate>({
      query: (pizza) => {
        const formData = generatePizzaCreateFormData(pizza);

        return {
          url: "create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Pizzas"],
    }),

    editPizza: builder.mutation<void, IPizzaEdit>({
      query: (pizza) => {
        const formData = generatePizzaEditFormData(pizza);

        return {
          url: "update",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Pizzas"],
    }),

    deletePizza: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pizzas"],
    }),
  }),
});

export const {
  useGetAllPizzasQuery,
  useEditPizzaMutation,
  useGetPizzaByIdQuery,
  useGetPagedPizzasQuery,
  useCreatePizzaMutation,
  useDeletePizzaMutation,
} = pizzaApi;
