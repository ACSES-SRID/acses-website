import { } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import Counter from "./Counter";

const stats = [
  {
    title: "Total Students",
    value: 602,
  },
  {
    title: "Graduates",
    value: 31,
  },
  {
    title: "CE Students",
    value: 537,
  },
  {
    title: "DS Students",
    value: 65,
  },
];

const yearlyData = [
  {
    year: "2021",
    CE: 31,
    DS: 0,
  },
  {
    year: "2022",
    CE: 99,
    DS: 0,
  },
  {
    year: "2023",
    CE: 152,
    DS: 0,
  },
  {
    year: "2024",
    CE: 161,
    DS: 0,
  },
  {
    year: "2025",
    CE: 125,
    DS: 65,
  },
];

const Statistics = () => {
  return (
    <section className="flex justify-center py-16 bg-gray-100 md:py-24">
      <div className="container px-6 md:px-32">
        <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
          ACSES Statistics
        </h2>
        {/* Statistics Summary */}
        <div className="grid gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-4 overflow-hidden bg-white border rounded-lg shadow-md"
            >
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-sm font-medium">{stat.title}</h3>
              </div>

              {/* Main Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-bold text-acses-green-500"
              >
                <Counter stat={stat.value} />
              </motion.div>

              {/* Duplicate Counter with Style Adjustments */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="absolute bottom-0 right-0 text-5xl font-bold text-gray-300 opacity-20"
              >
                <Counter stat={stat.value} />
              </motion.div>
            </div>
          ))}
        </div>
        {/* Yearly Data */}
        <div className="p-4 bg-white border rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-medium">
            Yearly Student Distribution
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="CE"
                  stroke="hsl(200, 70%, 50%)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="DS"
                  stroke="hsl(100, 70%, 50%)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
