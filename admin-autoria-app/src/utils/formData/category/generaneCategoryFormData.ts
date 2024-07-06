import { ICategoryCreate, ICategoryEdit } from "interfaces/category.ts";

export const generateCategoryCreateFormData = (category: ICategoryCreate): FormData => {
  const formData = new FormData();
  formData.append("Name", category.name);
  formData.append("Image", category.image);

  return formData;
};

export const generateCategoryEditFormData = (category: ICategoryEdit): FormData => {
  const formData = new FormData();
  formData.append("Id", category.id.toString());

  if (category.name) formData.append("Name", category.name);
  if (category.image) formData.append("Image", category.image);

  return formData;
};
