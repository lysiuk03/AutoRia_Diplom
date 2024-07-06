import { ICategory } from "interfaces/category.ts";
import { getRandomColor } from "utils/getRandomColor.ts";

export const generateCategoryChartData = (categories: ICategory[]) => {
  const labels = categories.map((data) => data.name);
  const data = categories.map((data) => data.pizzas.length);
  const backgroundColor = categories.map(() => getRandomColor());

  return {
    labels,
    datasets: [
      {
        label: "К-сть піцц в категорогії: ",
        data,
        backgroundColor,
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
};
