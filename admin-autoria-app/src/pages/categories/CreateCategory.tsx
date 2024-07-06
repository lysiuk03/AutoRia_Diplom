import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react";
import { useCreateCategoryMutation } from "app/services/categoryService.ts";
import Button from "components/ui/Button.tsx";
import FileInput from "components/ui/FileInput.tsx";
import Input from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { CategoryCreateSchema, CategoryCreateSchemaType } from "interfaces/zod/category.ts";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { showNotification } from "utils/showNotification.ts";

import React, { useState } from "react";

import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.tsx";

const CreateCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryCreateSchemaType>({ resolver: zodResolver(CategoryCreateSchema) });

  const onSubmit = async (data: CategoryCreateSchemaType) => {
    try {
      await createCategory({ ...data, image: data.image[0] as File }).unwrap();

      showNotification(`Успішно створено нову категорію!`, "success");
      navigate(`/categories/list`);
    } catch (error) {
      showNotification(`Помилка при створенні нової категорії!`, "error");
    }
  };

  const handleReset = () => {
    reset();
    setPreviewImage(undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>MyPizza | Category Create</title>
      </Helmet>
      <WelcomeBanner
        title="Create a New Category"
        description="Here you can create a new category for pizza. Enter a name and choose an image to get started."
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

export default CreateCategoryPage;
