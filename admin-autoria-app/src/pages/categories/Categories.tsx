import { IconCirclePlus } from "@tabler/icons-react";
import { useGetPagedCategoriesQuery } from "app/services/categoryService.ts";
import Button from "components/ui/Button.tsx";
import CategoriesTable from "partials/categories/CategoriesTable.tsx";
import WelcomeBanner from "partials/dashboard/WelcomeBanner.tsx";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 5;

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { data: categories, isLoading } = useGetPagedCategoriesQuery({
    pageIndex: page ? Number(page) - 1 : 0,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>MyPizza | Categories</title>
      </Helmet>

      <WelcomeBanner title="List of Categories" description="Here you can view the list of our pizza categories." />
      <Link to="/categories/create" className="flex justify-end">
        <Button variant="primary" size="sm">
          <IconCirclePlus />
          Create New Category
        </Button>
      </Link>
      <CategoriesTable categories={categories?.data} isLoading={isLoading} pagesAvailable={categories?.pagesAvailable || 0} />
    </div>
  );
};

export default CategoriesPage;
