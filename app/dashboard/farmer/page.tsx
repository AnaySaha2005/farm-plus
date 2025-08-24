"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";

interface WeatherData {
  temp: string;
  condition: string;
  forecast: string;
}

export default function FarmerDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("India");
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [locInsights, setLocInsights] = useState("");
  useEffect(() => {
    // Simulated AI Insights Fetching

    const getWeatherData = async () => {
      const res = await axios.get("/api/weather/farmer",  {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAiInsights(res.data.insights);
      setWeather({
        temp: res.data.temp,
        condition: res.data.condition,
        forecast: res.data.forecast,
      });
    };
    getWeatherData();
  }, []);
  async function locationData() {
    const res = await axios.post("/api/locationSearch", { location }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLocInsights(res.data.locInsight);
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          Farmer Dashboard
        </h1>

        {/* AI Insights */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-green-300">
            AI-Powered Farming Insights
          </h2>
          <ul className="mt-3 space-y-3">
            {aiInsights.map((insight, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded-md shadow-md">
                {insight}
              </li>
            ))}
          </ul>
        </div>

        {/* Weather Updates */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-green-300">
            Weather Updates
          </h2>
          {weather && (
            <div className="mt-3 text-lg">
              <p>
                <strong>Temperature:</strong> {weather.temp}
              </p>
              <p>
                <strong>Condition:</strong> {weather.condition}
              </p>
              <p>
                <strong>Forecast:</strong> {weather.forecast}
              </p>
            </div>
          )}
        </div>

        {/* Location & Area-Based Insights */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-300">
            Location-Based Insights
          </h2>
          <span className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-3">
            <input
              type="text"
              placeholder="Enter town, PIN code, or location"
              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:outline-none shadow-md w-full sm:w-auto"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition whitespace-nowrap"
              onClick={locationData}
            >
              Search
            </button>
          </span>
          {locInsights ? (
            <p className="bg-gray-700 p-3 rounded-md shadow-md my-4">
              {locInsights}
            </p>
          ) : (
            ""
          )}
          <p className="mt-3 text-lg">
            Localized insights will be displayed here based on:{" "}
            <span className="text-green-300">{location || "India"}</span>
          </p>
        </div>
      </div>
    </>
  );
}
