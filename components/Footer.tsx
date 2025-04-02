"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      className="bg-white dark:bg-darkGreen p-4 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center text-sm text-gray-600 dark:text-white">
        <p>© 2025 Farm-Plus. All Rights Reserved.</p>
        <div className="mt-2">
          <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
            Terms of Service
          </Link>
          {" | "}
          <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
