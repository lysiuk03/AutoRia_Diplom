import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react";
import { useEditIngredientMutation, useGetIngredientByIdQuery } from "app/services/ingredientService.ts";
import LoadingSpinner from "components/LoadingSpinner.tsx";
import Button from "components/ui/Button.tsx";
import FileInput from "components/ui/FileInput.tsx";
import Input from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { IIngredient } from "interfaces/ingredient.ts";
import { IngredientEditSchema, IngredientEditSchemaType } from "interfaces/zod/ingredient.ts";
import WelcomeBanner from "partials/dashboard/WelcomeBanner.tsx";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "utils/envData.ts";
import { showNotification } from "utils/showNotification.ts";

import React, { useEffect, useState } from "react";

const EditIngredientPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [editIngredient, { isLoading: isIngredientUpdating }] = useEditIngredientMutation();
  const { data: ingredient, isLoading: isIngredientLoading } = useGetIngredientByIdQuery(Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IngredientEditSchemaType>({ resolver: zodResolver(IngredientEditSchema) });

  useEffect(() => {
    getDefaultCategory(ingredient);
  }, [ingredient, setValue]);

  const onSubmit = async (data: IngredientEditSchemaType) => {
    try {
      await editIngredient({ ...data, image: data.image[0] as File }).unwrap();

      showNotification(`Ingredients successfully updated!`, "success");
      navigate(`/ingredients/list`);
    } catch (error) {
      showNotification(`Error updating ingredients!`, "error");
    }
  };

  const handleReset = () => {
    reset();
    getDefaultCategory(ingredient);
  };

  const getDefaultCategory = (ingredient?: IIngredient) => {
    if (ingredient) {
      setValue("id", ingredient.id);
      setValue("name", ingredient.name);
      setPreviewImage(`${API_URL}/images/400_${ingredient.image}`);
    }
  };

  if (isIngredientLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>{`MyPizza | ${ingredient?.name} Edit`}</title>
      </Helmet>
      <WelcomeBanner
        title="Edit Category"
        description="Update the details of the category. You can modify the name and choose a new image."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" {...register("name")} />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="image">Image</Label>
          <FileInput previewImage={previewImage} setPreviewImage={setPreviewImage} {...register("image")} />
          {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>}
        </div>

        <div className="hidden">
          <Label htmlFor="id">Id</Label>
          <input type="text" id="id" {...register("id")} />
          {errors.id && <p className="mt-2 text-sm text-red-600">{errors.id.message}</p>}
        </div>

        <div className="flex justify-center gap-5">
          <Button disabled={isIngredientUpdating} variant="success" size="sm" type="submit">
            {isIngredientUpdating ? <IconLoader2 className="animate-spin" /> : <IconCheck />} Submit
          </Button>
          <Button disabled={isIngredientUpdating} onClick={handleReset} variant="danger" size="sm" type="button">
            <IconX /> Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditIngredientPage;
