import { useGetAllCategoriesQuery } from "app/services/categoryService.ts";
import PieChart from "components/charts/PieChart.tsx";
import { Label } from "components/ui";
import { generateCategoryChartData } from "utils/charts/generateCategoryChartData.ts";

import WelcomeBanner from "../partials/dashboard/WelcomeBanner.tsx";

const Dashboard = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <>
      <WelcomeBanner
        title="Welcome to MyPizza"
        description="Where you can find the tastiest pizzas and create your favorite categories."
      />
      <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Статистика по категоріям</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <Label className="text-lg font-semibold mb-4">Кількість піцц по категоріях</Label>
            {categories && <PieChart chartData={generateCategoryChartData(categories)} />}
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <Label className="text-lg font-semibold mb-4">Кількість піцц по категоріях</Label>
            {categories && <PieChart chartData={generateCategoryChartData(categories)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
