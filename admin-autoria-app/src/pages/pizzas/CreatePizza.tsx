import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconLoader2, IconPlus, IconX } from "@tabler/icons-react";
import { useGetAllCategoriesQuery } from "app/services/categoryService.ts";
import { useGetAllIngredientsQuery } from "app/services/ingredientService.ts";
import { useCreatePizzaMutation } from "app/services/pizzaService.ts";
import PizzaSizePriceFields from "components/PizzaSizePriceFields.tsx";
import { Button, Checkbox, FileInputMultiple, Input, Label, Select, TextArea } from "components/ui";
import { IPizzaSizePrice } from "interfaces/pizza.ts";
import { PizzaCreateSchema, PizzaCreateSchemaType } from "interfaces/zod/pizza.ts";
import WelcomeBanner from "partials/dashboard/WelcomeBanner.tsx";
import { Helmet } from "react-helmet";
import { UseFormGetValues, UseFormSetValue, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleFileChange } from "utils/fileUtils.ts";
import { showNotification } from "utils/showNotification.ts";

import React, { useEffect, useRef, useState } from "react";

const CreatePizzaPage: React.FC = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: categories, isLoading: isLoadingCategories } = useGetAllCategoriesQuery();
  const { data: ingredients, isLoading: isLoadingIngredients } = useGetAllIngredientsQuery();

  const [createPizza, { isLoading: isLoadingCreate }] = useCreatePizzaMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PizzaCreateSchemaType>({ resolver: zodResolver(PizzaCreateSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      photos.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
    setValue("photos", inputRef.current?.files as any);
  }, [photos, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPizza({ ...data, photos: data.photos as File[], sizes: data.sizes as IPizzaSizePrice[] });

      showNotification(`Успішно створено нову піццу!`, "success");
      navigate(`/pizzas/list`);
    } catch (error) {
      showNotification(`Помилка при створенні нової піцци!`, "error");
    }
  });

  const onReset = () => {
    reset();
    setPhotos([]);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<PizzaCreateSchemaType>,
    getValues: UseFormGetValues<PizzaCreateSchemaType>,
  ) => {
    const { value, checked } = event.target;
    const currentValues = getValues("ingredientIds") || [];

    if (checked) {
      setValue("ingredientIds", [...currentValues, parseInt(value)], {
        shouldValidate: true,
      });
    } else {
      setValue(
        "ingredientIds",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        currentValues.filter((val) => val !== parseInt(value)),
        {
          shouldValidate: true,
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>{`MyPizza | Pizza Create`}</title>
      </Helmet>
      <WelcomeBanner
        title="Create a New Pizza"
        description="Here you can create a new  pizza. Enter a data and choose an image to get started."
      />

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input {...register("name")} type="text" id="name" />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea {...register("description")} id="description" />
          {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <Label htmlFor="categoryId">Category</Label>
          <Select {...register("categoryId")} disabled={isLoadingCategories} defaultValue="" id="categoryId">
            <option disabled value="">
              Оберіть категорію
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {errors.categoryId && <p className="mt-2 text-sm text-red-600">{errors.categoryId.message}</p>}
        </div>

        <div>
          <Label>Ingredients</Label>
          <div className="p-2.5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
            {ingredients?.map((ingredient) => (
              <Label key={ingredient.id} size="small">
                <Checkbox
                  id={`ingredient-${ingredient.id}`}
                  type="checkbox"
                  disabled={isLoadingIngredients}
                  value={ingredient.id}
                  onChange={(event) => handleCheckboxChange(event, setValue, getValues)}
                />
                <span>{ingredient.name}</span>
              </Label>
            ))}
          </div>
          {errors.ingredientIds && <p className="mt-2 text-sm text-red-600">{errors.ingredientIds.message}</p>}
        </div>

        <div>
          <Label>Sizes</Label>
          <div className="p-2.5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
            {fields.map((field, index) => (
              <PizzaSizePriceFields key={field.id} errors={errors} index={index} register={register} removeSize={remove} />
            ))}

            <div className="flex justify-center">
              <Button type="button" variant="primary" size="sm" onClick={() => append({ sizeId: -1, price: 200 })}>
                <IconPlus /> Add Size
              </Button>
            </div>
          </div>
          {errors.sizes && <p className="mt-2 text-sm text-red-600">{errors.sizes.message}</p>}
          {errors.sizes?.root && <p className="mt-2 text-sm text-red-600">{errors.sizes.root?.message}</p>}
        </div>

        <div>
          <Label>Images</Label>
          <FileInputMultiple files={photos} setFiles={setPhotos}>
            <Input
              {...register("photos")}
              onChange={(e) => handleFileChange(e, setPhotos)}
              multiple
              ref={inputRef}
              id="photos"
              type="file"
              variant="file"
            />
          </FileInputMultiple>
          {errors.photos && photos.length === 0 && <p className="mt-2 text-sm text-red-600">{errors.photos.message}</p>}
        </div>

        <div className="flex justify-center gap-5">
          <Button disabled={isLoadingCreate} variant="success" size="sm" type="submit">
            {isLoadingCreate ? <IconLoader2 className="animate-spin" /> : <IconCheck />} Submit
          </Button>
          <Button disabled={isLoadingCreate} variant="danger" size="sm" onClick={onReset}>
            <IconX /> Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePizzaPage;
