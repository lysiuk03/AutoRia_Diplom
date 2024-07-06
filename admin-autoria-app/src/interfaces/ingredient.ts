export interface IIngredient {
  id: number;
  name: string;
  image: string;
}

export interface IIngredientCreate {
  name: string;
  image: File;
}

export interface IIngredientEdit {
  id: number;
  name: string | null;
  image: File | null;
}
