import React from "react";
import { motion } from "framer-motion";

const ProgramCard = ({ icon, title, description, lists = [] }) => {
  return (
    <div className="relative w-full p-6 transition-all duration-300 ease-in-out transform bg-white border border-gray-200 rounded-lg shadow-lg group hover:shadow-2xl hover:-translate-y-2">
      {/* Icon */}
      <motion.div
        className="absolute flex items-center justify-center w-12 h-12 p-2 border rounded-full shadow-md bg-acses-green-500 -top-6 left-6"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2, rotate: 15 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>

      <div className="mt-8">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-acses-green-600">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>

        {/* List Items */}
        {lists.length > 0 && (
          <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
            {lists.map((list, index) => (
              <li key={index} className="text-sm">
                {list}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Hover Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 transition-transform duration-300 scale-x-0 bg-acses-green-500 group-hover:scale-x-100"></div>
    </div>
  );
};

export default ProgramCard;
