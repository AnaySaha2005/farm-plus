"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";

export default function TraderDashboard() {
  const [weather, setWeather] = useState<{
    temp: string;
    condition: string;
    forecast: string;
  } | null>(null);
  const [location, setLocation] = useState("");
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [marketTrends, setMarketTrends] = useState<
    { Crop: string; Price: string; Demand: string }[]
  >([]);

  useEffect(() => {
    async function getData(){
      const res=await axios.get('/api/weather/trader')
      // console.dir(res.data.marketTrends)
      setWeather(
        {
          temp:res.data.temp,
          condition:res.data.condition,
          forecast:res.data.forecast
        }
      )
      setAiInsights(res.data.insights);
      setMarketTrends(res.data.marketTrends)
    }
    getData();
  }, []);
   {console.dir(marketTrends)}
  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          Trader Dashboard
        </h1>
    
        {/* AI Insights */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-green-300">
            AI-Powered Market Insights
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

        {/* Nearby Crop Market Trends */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-300">
            Nearby Crop Market Trends
          </h2>
          <ul className="mt-3 space-y-3">
            {marketTrends.map((trend, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded-md shadow-md">
                <p>
                  <strong>Crop:</strong> {trend.Crop}
                </p>
                <p>
                  <strong>Price:</strong> {trend.Price}
                </p>
                <p>
                  <strong>Demand:</strong> {trend.Demand}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
