import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "app/services/categoryService.ts";
import { ingredientApi } from "app/services/ingredientService.ts";
import { pizzaApi } from "app/services/pizzaService.ts";
import { pizzaSizeApi } from "app/services/pizzaSizeService.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    [pizzaSizeApi.reducerPath]: pizzaSizeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware, pizzaApi.middleware, ingredientApi.middleware, pizzaSizeApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
