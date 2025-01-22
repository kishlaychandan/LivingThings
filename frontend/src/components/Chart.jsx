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

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to debounce state updates
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on value change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    algoStatus: "active",
  });

  // Debounced filter state
  const debouncedFilters = useDebounce(filters, 500); // Delay of 500ms

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchChartData(debouncedFilters); // Pass debounced filters dynamically
        setChartData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (debouncedFilters) {
      loadData();
    }
  }, [debouncedFilters]);

  const data = chartData
    ? {
        labels: chartData.map((item) =>
          new Date(item.date).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Energy Consumption (kWh)",
            data: chartData.map((item) => item.value),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Energy Consumption Chart
      </h2>

      {/* Filter Section */}
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

      {/* Chart */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        {chartData && <Line data={data} />}
      </div>
    </div>
  );
};

export default Chart;
