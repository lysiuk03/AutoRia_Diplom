import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react";
import { useCreateIngredientMutation } from "app/services/ingredientService.ts";
import Button from "components/ui/Button.tsx";
import FileInput from "components/ui/FileInput.tsx";
import Input from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { IngredientCreateSchema, IngredientCreateSchemaType } from "interfaces/zod/ingredient.ts";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { showNotification } from "utils/showNotification.ts";

import React, { useState } from "react";

import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.tsx";

const CreateIngredientPage: React.FC = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [createIngredient, { isLoading }] = useCreateIngredientMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IngredientCreateSchemaType>({ resolver: zodResolver(IngredientCreateSchema) });

  const onSubmit = async (data: IngredientCreateSchemaType) => {
    try {
      await createIngredient({ ...data, image: data.image[0] as File }).unwrap();

      showNotification(`Успішно створено новий інгредієнт!`, "success");
      navigate(`/ingredients/list`);
    } catch (error) {
      showNotification(`Помилка при створенні новий інгредієнт!`, "error");
    }
  };

  const handleReset = () => {
    reset();
    setPreviewImage(undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>{`MyPizza | Ingredients Create`}</title>
      </Helmet>
      <WelcomeBanner
        title="Create a New Ingredient"
        description="Here you can create a new ingredient for pizza. Enter a name and choose an image to get started."
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

        <div className="flex justify-center gap-5">
          <Button disabled={isLoading} variant="success" size="sm" type="submit">
            {isLoading ? <IconLoader2 className="animate-spin" /> : <IconCheck />} Submit
          </Button>
          <Button disabled={isLoading} onClick={handleReset} variant="danger" size="sm" type="submit">
            <IconX /> Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateIngredientPage;
