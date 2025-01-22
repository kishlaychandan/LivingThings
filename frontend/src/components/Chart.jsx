import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchChartData } from "../services/api";

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData();
      setChartData(data);
    };
    loadData();
  }, []);

  if (!chartData) {
    return <p>Loading...</p>;
  }

  const data = {
    labels: chartData.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: chartData.map((item) => item.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div>
      <h2>Energy Consumption Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default Chart;
