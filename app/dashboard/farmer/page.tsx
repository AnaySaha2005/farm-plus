"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FarmerDashboard() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkGreen text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-semibold">👨‍🌾 Farmer Dashboard</h1>

      {/* AI Chatbot */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">AI Chatbot 🤖</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Ask any farming-related questions!
        </p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700">
          Chat Now
        </button>
      </div>

      {/* Pest Detection */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">Pest Detection 📸</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Upload an image to detect pests using AI.
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block w-full border rounded-md p-2 bg-gray-100 dark:bg-greyBlack"
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-green-600">Selected: {selectedFile.name}</p>
        )}
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md transition hover:bg-green-700">
          Analyze Image
        </button>
      </div>

      {/* Market Trends */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">Market Trends 📊</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Get the latest crop prices and market updates.
        </p>
        <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-md transition hover:bg-yellow-700">
          View Trends
        </button>
      </div>

      {/* Doubt Support */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">Doubt Support ❓</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Ask experts about farming-related issues.
        </p>
        <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md transition hover:bg-red-700">
          Ask a Doubt
        </button>
      </div>

      {/* Potential Buyers */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-greyBlack rounded-md">
        <h2 className="text-xl font-semibold">Potential Buyers 🛒</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Find traders who are looking to buy your crops.
        </p>
        <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md transition hover:bg-purple-700">
          View Buyers
        </button>
      </div>
    </div>
  );
}
