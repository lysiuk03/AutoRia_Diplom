import { ArcElement, ChartData, Chart as ChartJS, ChartOptions, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
interface PieChartProps {
  chartData: ChartData<"pie">;
  options?: ChartOptions<"pie">;
}
const PieChart: React.FC<PieChartProps> = ({ chartData, options }) => {
  return <Pie data={chartData} options={options} />;
};

export default PieChart;
