"use client";
import { useState } from "react";

export default function TraderDashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-darkGreen text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-semibold">📈 Trader Dashboard</h1>

      {/* Market Insights */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">Market Insights 📊</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Stay updated with the latest agricultural market trends.
        </p>
        <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-md transition hover:bg-yellow-700">
          View Insights
        </button>
      </div>

      {/* Recent Buyings */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">Recent Buyings 🛍️</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          View the list of your most recent purchases.
        </p>
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md transition hover:bg-green-700">
          View Buyings
        </button>
      </div>

      {/* Market Listings */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">Market Listings 📋</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Browse available crops and produce from farmers.
        </p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700">
          View Listings
        </button>
      </div>

      {/* AI Chatbot */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">AI Chatbot 🤖</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Get AI-powered insights on market trends and crop pricing.
        </p>
        <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md transition hover:bg-purple-700">
          Chat Now
        </button>
      </div>
    </div>
  );
}
