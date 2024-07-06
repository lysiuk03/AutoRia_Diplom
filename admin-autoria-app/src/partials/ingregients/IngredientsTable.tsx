import { useDeleteIngredientMutation } from "app/services/ingredientService.ts";
import ConfirmDialog from "components/ConfirmDialog.tsx";
import EmptyData from "components/EmptyData.tsx";
import TableCategoriesSkeleton from "components/skeletons/TableCategoriesSkeleton.tsx";
import { ICategory } from "interfaces/category";
import { Link } from "react-router-dom";
import { API_URL } from "utils/envData.ts";

import React, { useState } from "react";

interface IngredientsTableProps {
  ingredients: ICategory[] | undefined;
  pagesAvailable: number;
  isLoading: boolean;
}

const IngredientsTable: React.FC<IngredientsTableProps> = (props) => {
  const { ingredients, isLoading } = props;

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [ingredientIdToDelete, setIngredientIdToDelete] = useState<number | null>(null);

  const [deleteIngredient, { isLoading: isDeleting }] = useDeleteIngredientMutation();

  const openDeleteConfirm = (id: number) => {
    setIngredientIdToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (ingredientIdToDelete !== null) {
      try {
        await deleteIngredient(ingredientIdToDelete).unwrap();
      } catch (err) {
        console.error("Failed to delete the category: ", err);
      }
      setIsDeleteConfirmOpen(false);
      setIngredientIdToDelete(null);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-24">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Ingredient name
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Buttons</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Loading skeleton */}
          {isLoading && <TableCategoriesSkeleton />}

          {/* Loaded data */}
          {ingredients?.map((ingredient) => (
            <tr
              key={ingredient.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img
                  src={`${API_URL}/images/200_${ingredient.image}`}
                  alt={ingredient.name}
                  className="min-w-10 w-10 h-10 bg-gray-200 object-cover rounded-full hover:scale-150 transition-all duration-300 cursor-pointer"
                />
              </th>
              <td className="px-6 py-4">{ingredient.name}</td>
              <td className="px-6 py-4 text-right space-x-5">
                <Link to={`/ingredients/edit/${ingredient.id}`}>
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </Link>

                <button
                  onClick={() => openDeleteConfirm(ingredient.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No data */}
      {!isLoading && !ingredients?.length && <EmptyData pathTo="/ingredients/create" />}

      {/*<Pagination totalPages={pagesAvailable} />*/}

      <ConfirmDialog
        title="Confirm delete category?"
        isOpen={isDeleteConfirmOpen}
        close={() => setIsDeleteConfirmOpen(false)}
        action={handleDelete}
        actionProcessing={isDeleting}
      />
    </div>
  );
};

export default IngredientsTable;
