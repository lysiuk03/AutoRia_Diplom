import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react";
import { useEditCategoryMutation, useGetCategoryByIdQuery } from "app/services/categoryService.ts";
import LoadingSpinner from "components/LoadingSpinner.tsx";
import Button from "components/ui/Button.tsx";
import FileInput from "components/ui/FileInput.tsx";
import Input from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { ICategory } from "interfaces/category.ts";
import { CategoryEditSchema, CategoryEditSchemaType } from "interfaces/zod/category.ts";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "utils/envData.ts";
import { showNotification } from "utils/showNotification.ts";

import React, { useEffect, useState } from "react";

import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.tsx";

const EditCategoryPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  const [editCategory, { isLoading: isCategoryUpdating }] = useEditCategoryMutation();
  const { data: category, isLoading: isCategoryLoading } = useGetCategoryByIdQuery(Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CategoryEditSchemaType>({ resolver: zodResolver(CategoryEditSchema) });

  useEffect(() => {
    getDefaultCategory(category);
  }, [category, setValue]);

  const onSubmit = async (data: CategoryEditSchemaType) => {
    console.log(data);
    try {
      await editCategory({ ...data, image: data.image[0] as File }).unwrap();

      showNotification(`Category successfully updated!`, "success");
      navigate(`/categories/list`);
    } catch (error) {
      showNotification(`Error updating category!`, "error");
    }
  };

  const handleReset = () => {
    reset();
    getDefaultCategory(category);
  };

  const getDefaultCategory = (category?: ICategory) => {
    if (category) {
      setValue("id", category.id);
      setValue("name", category.name);
      setPreviewImage(`${API_URL}/images/400_${category.image}`);
    }
  };

  if (isCategoryLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>{`MyPizza | ${category?.name} Edit`}</title>
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
          <Button disabled={isCategoryUpdating} variant="success" size="sm" type="submit">
            {isCategoryUpdating ? <IconLoader2 className="animate-spin" /> : <IconCheck />} Submit
          </Button>
          <Button disabled={isCategoryUpdating} onClick={handleReset} variant="danger" size="sm" type="button">
            <IconX /> Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryPage;
