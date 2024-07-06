import { ICategory } from "interfaces/category.ts";
import { IPhoto } from "interfaces/index.ts";
import { IIngredient } from "interfaces/ingredient.ts";
import { IPaginationOptions } from "interfaces/pagination.ts";

export interface IPizzaSizePrice {
  sizeId: number;
  price: number;
}

export interface IPizzaSize {
  id: number;
  name: string;
}

export interface IPizzaPagedRequest extends IPaginationOptions {
  name?: string;
}
export interface IPizzaSize {
  id: number;
  sizeId: number;
  sizeName: string;
  price: number;
}

export interface IPizza {
  id: number;
  name: string;
  description: string;
  rating: number;
  isAvailable: boolean;
  category: ICategory;
  photos: IPhoto[];
  ingredients: IIngredient[];
  sizes: IPizzaSize[];
  dateCreated: string;
}

export interface IPizzaCreate {
  name: string;
  description: string;
  categoryId: string;
  ingredientIds: number[];
  photos: File[];
  sizes: IPizzaSizePrice[];
}

export interface IPizzaEdit {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  ingredientIds: number[];
  sizes: IPizzaSizePrice[];
  photos: File[];
}
