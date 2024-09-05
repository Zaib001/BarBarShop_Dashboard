import React from 'react';
import { motion } from 'framer-motion';

const Widget = ({ title, value }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md sm:p-4 md:p-6 lg:p-8 xl:p-10"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-gray-700 font-bold text-lg sm:text-md md:text-lg lg:text-xl xl:text-2xl">
        {title}
      </h2>
      <p className="text-gray-500 text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        {value}
      </p>
    </motion.div>
  );
};

export default Widget;
