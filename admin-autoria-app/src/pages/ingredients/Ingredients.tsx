import { IconCirclePlus } from "@tabler/icons-react";
import { useGetAllIngredientsQuery } from "app/services/ingredientService.ts";
import Button from "components/ui/Button.tsx";
import WelcomeBanner from "partials/dashboard/WelcomeBanner.tsx";
import IngredientsTable from "partials/ingregients/IngredientsTable.tsx";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const IngredientsPage = () => {
  const { data: ingredients, isLoading } = useGetAllIngredientsQuery();

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>{`MyPizza | Ingredients`}</title>
      </Helmet>
      <WelcomeBanner title="List of Ingredients" description="Here you can view the list of ingredient for our pizzas." />
      <Link to="/ingredients/create" className="flex justify-end">
        <Button variant="primary" size="sm">
          <IconCirclePlus />
          Create New Ingredient
        </Button>
      </Link>
      <IngredientsTable ingredients={ingredients} isLoading={isLoading} pagesAvailable={0} />
    </div>
  );
};

export default IngredientsPage;
