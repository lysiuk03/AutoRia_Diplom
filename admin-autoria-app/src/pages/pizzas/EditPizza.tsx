import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconLoader2, IconPlus, IconX } from "@tabler/icons-react";
import { useGetAllCategoriesQuery } from "app/services/categoryService.ts";
import { useGetAllIngredientsQuery } from "app/services/ingredientService.ts";
import { useEditPizzaMutation, useGetPizzaByIdQuery } from "app/services/pizzaService.ts";
import LoadingSpinner from "components/LoadingSpinner.tsx";
import PizzaSizePriceFields from "components/PizzaSizePriceFields.tsx";
import { Button, Checkbox, FileInputMultiple, Input, Label, Select, TextArea } from "components/ui";
import { IPizza, IPizzaSizePrice } from "interfaces/pizza.ts";
import { PizzaEditSchema, PizzaEditSchemaType } from "interfaces/zod/pizza.ts";
import WelcomeBanner from "partials/dashboard/WelcomeBanner.tsx";
import { Helmet } from "react-helmet";
import { UseFormGetValues, UseFormSetValue, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "utils/envData.ts";
import { handleFileChange } from "utils/fileUtils.ts";
import { showNotification } from "utils/showNotification.ts";
import { convertUrlsToFiles } from "utils/urlToFile.ts";

import React, { useEffect, useRef, useState } from "react";

const EditPizzaPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    control,
  } = useForm<PizzaEditSchemaType>({ resolver: zodResolver(PizzaEditSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const { data: pizza, isLoading: isPizzaLoading } = useGetPizzaByIdQuery(Number(id));
  const { data: categories, isLoading: isLoadingCategories } = useGetAllCategoriesQuery();
  const { data: ingredients, isLoading: isLoadingIngredients } = useGetAllIngredientsQuery();

  const [update, { isLoading: isLoadingUpdate }] = useEditPizzaMutation();

  useEffect(() => {
    getDefaultPizza(pizza);
  }, [pizza, setValue]);

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      photos.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
    setValue("photos", inputRef.current?.files as any);
  }, [photos, setValue]);

  const onSubmit = async (data: PizzaEditSchemaType) => {
    try {
      console.log(data);
      await update({ ...data, photos: data.photos as File[], sizes: data.sizes as IPizzaSizePrice[] });

      showNotification(`Успішно змінено піццу!`, "success");
      navigate(`/pizzas/list`);
    } catch (error) {
      showNotification(`Помилка при зміненні піцци!`, "error");
    }
  };

  const getDefaultPizza = async (pizza?: IPizza) => {
    if (pizza) {
      setValue("id", pizza.id);
      setValue("name", pizza.name);
      setValue("description", pizza.description);
      setValue("categoryId", pizza.category.id.toString());

      setValue(
        "ingredientIds",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        pizza.ingredients.map((ingredient) => ingredient.id),
      );

      setValue(
        "sizes",
        pizza.sizes.map((size) => ({ sizeId: size.sizeId, price: size.price })),
      );

      const files = await convertUrlsToFiles(pizza.photos.map((photo) => `${API_URL}/images/1200_${photo.name}`));
      setPhotos(files);
      setValue("photos", files);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<PizzaEditSchemaType>,
    getValues: UseFormGetValues<PizzaEditSchemaType>,
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

  const handleReset = () => {
    reset();
    getDefaultPizza(pizza);
  };

  if (isPizzaLoading || isLoadingCategories) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>{`MyPizza | ${pizza?.name} Edit`}</title>
      </Helmet>
      <WelcomeBanner
        title="Edit Pizza"
        description="Update the details of the pizza. You can modify the name and choose a new image."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" {...register("name")} />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea {...register("description")} id="description" />
          {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <Label htmlFor="categoryId">Category</Label>
          <Select {...register("categoryId")} disabled={isLoadingCategories} defaultValue={pizza?.category.id} id="categoryId">
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
                  defaultChecked={pizza?.ingredients.map((ingredient) => ingredient.id)?.includes(ingredient.id)}
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

        <div className="hidden">
          <Label htmlFor="id">Id</Label>
          <input type="text" id="id" {...register("id")} />
          {errors.id && <p className="mt-2 text-sm text-red-600">{errors.id.message}</p>}
        </div>

        <div className="flex justify-center gap-5">
          <Button disabled={isLoadingUpdate} variant="success" size="sm" type="submit">
            {isLoadingUpdate ? <IconLoader2 className="animate-spin" /> : <IconCheck />} Submit
          </Button>
          <Button disabled={isLoadingUpdate} onClick={handleReset} variant="danger" size="sm" type="button">
            <IconX /> Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPizzaPage;
