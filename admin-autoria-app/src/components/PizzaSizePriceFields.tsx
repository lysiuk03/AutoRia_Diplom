import { IconTrash } from "@tabler/icons-react";
import { useGetAllPizzaSizesQuery } from "app/services/pizzaSizeService.ts";
import LoadingSpinner from "components/LoadingSpinner.tsx";
import Button from "components/ui/Button.tsx";
import Input from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import Select from "components/ui/Select.tsx";
import { PizzaCreateSchemaType, PizzaEditSchemaType } from "interfaces/zod/pizza.ts";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import React from "react";

interface PizzaSizePriceFieldsProps {
  index: number;
  register: UseFormRegister<any>;
  errors: FieldErrors<PizzaCreateSchemaType | PizzaEditSchemaType>;
  removeSize: (index: number) => void;
}

const PizzaSizePriceFields: React.FC<PizzaSizePriceFieldsProps> = ({ index, register, errors, removeSize }) => {
  const { data: sizes, isLoading: isLoadingPizzaSizes } = useGetAllPizzaSizesQuery();

  if (isLoadingPizzaSizes) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full mb-4 pb-2 gap-2 ">
      <div>
        <Label htmlFor={`sizes[${index}].sizeId`}>Size</Label>
        <Select
          {...register(`sizes.${index}.sizeId`)}
          disabled={isLoadingPizzaSizes}
          // defaultValue={sizeId}
          id={`sizes[${index}].sizeId`}
        >
          <option disabled value="-1">
            Додати розмір
          </option>
          {sizes?.map((size) => (
            <option key={size.id} value={size.id}>
              {size.name} см
            </option>
          ))}
        </Select>
        {errors.sizes?.[index]?.sizeId && <p className="mt-2 text-sm text-red-600">{errors.sizes[index]?.sizeId?.message}</p>}
      </div>
      <div>
        <Label htmlFor={`sizes[${index}].price`}>Price, UAH</Label>
        <Input
          {...register(`sizes.${index}.price`)}
          min={0}
          defaultValue="200"
          max={10000}
          type="number"
          id={`sizes[${index}].price`}
        />
        {errors.sizes?.[index]?.price && <p className="mt-2 text-sm text-red-600">{errors.sizes[index]?.price?.message}</p>}
      </div>

      <div className="flex flex-row-reverse">
        <Button type="button" variant="danger" size="sm" onClick={() => removeSize(index)}>
          <IconTrash />
        </Button>
      </div>
    </div>
  );
};

export default PizzaSizePriceFields;
