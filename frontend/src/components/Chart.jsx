import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchChartData } from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "2023-01-01",
    endDate: "2024-01-31",
    algoStatus: "active",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchChartData(filters);
        setChartData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadData();
  }, [filters]);

  const data = chartData
    ? {
        labels: chartData.map((item) =>
          new Date(item.createdAt).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Energy Consumed (Saving Mode On)",
            data: chartData.map((item) => item.energy_savings.us_calc),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Energy Consumed (Saving Mode Off)",
            data: chartData.map((item) => item.energy_savings.ref_kwh),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Energy Consumption Chart
      </h2>

      <div className="flex justify-between mb-6 p-4 border rounded-lg bg-gray-100">
        <div>
          <label className="block text-gray-600 font-medium">Start Date:</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">End Date:</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Status:</label>
          <select
            value={filters.algoStatus}
            onChange={(e) =>
              setFilters({ ...filters, algoStatus: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        {chartData && <Line data={data} />}
      </div>
    </div>
  );
};

export default Chart;
