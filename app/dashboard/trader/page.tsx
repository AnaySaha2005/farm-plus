'use client';

import { useState, useEffect } from 'react';

export default function TraderDashboard() {
  const [weather, setWeather] = useState<{ temp: string; condition: string; forecast: string } | null>(null);
  const [location, setLocation] = useState('');
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [marketTrends, setMarketTrends] = useState<{ crop: string; price: string; demand: string }[]>([]);

  useEffect(() => {
    // Simulated AI Insights Fetching
    setAiInsights([
      'High demand for organic wheat in your area.',
      'Stock up on corn as prices are predicted to rise.',
      'Monitor tomato prices, expected to fluctuate soon.'
    ]);
  }, []);

  useEffect(() => {
    // Simulated Weather Fetching
    setWeather({ temp: '30°C', condition: 'Sunny', forecast: 'Rain expected in 2 days' });
  }, []);

  useEffect(() => {
    // Simulated Market Trends Fetching
    setMarketTrends([
      { crop: 'Wheat', price: '$200/ton', demand: 'High' },
      { crop: 'Corn', price: '$150/ton', demand: 'Moderate' },
      { crop: 'Tomato', price: '$1.50/kg', demand: 'Low' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">Trader Dashboard</h1>
      
      {/* AI Insights */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-green-300">AI-Powered Market Insights</h2>
        <ul className="mt-3 space-y-3">
          {aiInsights.map((insight, index) => (
            <li key={index} className="bg-gray-700 p-3 rounded-md shadow-md">{insight}</li>
          ))}
        </ul>
      </div>

      {/* Weather Updates */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-green-300">Weather Updates</h2>
        {weather && (
          <div className="mt-3 text-lg">
            <p><strong>Temperature:</strong> {weather.temp}</p>
            <p><strong>Condition:</strong> {weather.condition}</p>
            <p><strong>Forecast:</strong> {weather.forecast}</p>
          </div>
        )}
      </div>

      {/* Location & Area-Based Insights */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-green-300">Location-Based Insights</h2>
        <input 
          type="text" 
          placeholder="Enter town, PIN code, or location" 
          className="mt-3 p-3 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:outline-none shadow-md"
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
        />
        <p className="mt-3 text-lg">Market trends for: <span className="text-green-300">{location || 'your location'}</span></p>
      </div>

      {/* Nearby Crop Market Trends */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-green-300">Nearby Crop Market Trends</h2>
        <ul className="mt-3 space-y-3">
          {marketTrends.map((trend, index) => (
            <li key={index} className="bg-gray-700 p-3 rounded-md shadow-md">
              <p><strong>Crop:</strong> {trend.crop}</p>
              <p><strong>Price:</strong> {trend.price}</p>
              <p><strong>Demand:</strong> {trend.demand}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
