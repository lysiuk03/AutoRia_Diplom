import { IconCirclePlus } from "@tabler/icons-react";
import { useGetPagedPizzasQuery } from "app/services/pizzaService.ts";
import Button from "components/ui/Button.tsx";
import WelcomeBanner from "partials/dashboard/WelcomeBanner.tsx";
import PizzasTable from "partials/pizzas/PizzasTable.tsx";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 5;

const PizzasPage = () => {
  // const { data: pizzas, isLoading } = useGetAllPizzasQuery();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { data: pizzas, isLoading } = useGetPagedPizzasQuery({
    pageIndex: page ? Number(page) - 1 : 0,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>{`MyPizza | Pizzas`}</title>
      </Helmet>
      <WelcomeBanner title="List of Pizzas" description="Here you can view the list of our pizzas." />

      <Link to={"/pizzas/create"} className="flex justify-end">
        <Button variant="primary" size="sm">
          <IconCirclePlus />
          Create New Pizza
        </Button>
      </Link>
      <PizzasTable pizzas={pizzas?.data} isLoading={isLoading} pagesAvailable={pizzas?.pagesAvailable || 0} />
    </div>
  );
};

export default PizzasPage;
