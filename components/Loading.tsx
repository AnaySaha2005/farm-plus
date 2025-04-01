// components/Loading.tsx
"use client";

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-white dark:bg-darkGreen opacity-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-t-4 border-blue-600 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default Loading;
