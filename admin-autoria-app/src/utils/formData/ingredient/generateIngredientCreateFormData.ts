import { IIngredientCreate, IIngredientEdit } from "interfaces/ingredient.ts";

export const generateIngredientCreateFormData = (ingredient: IIngredientCreate): FormData => {
  const formData = new FormData();
  formData.append("Name", ingredient.name);
  formData.append("Image", ingredient.image);

  return formData;
};

export const generateIngredientEditFormData = (ingredient: IIngredientEdit): FormData => {
  const formData = new FormData();
  formData.append("Id", ingredient.id.toString());

  if (ingredient.name) formData.append("Name", ingredient.name);
  if (ingredient.image) formData.append("Image", ingredient.image);

  return formData;
};
