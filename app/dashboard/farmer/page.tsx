'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

interface WeatherData {
  temp: string;
  condition: string;
  forecast: string;
}

export default function FarmerDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('');
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  useEffect(() => {
    // Simulated AI Insights Fetching
    setAiInsights([
      'Use organic fertilizers for better soil health.',
      'Pest activity detected: Consider neem-based pesticides.',
      'Best crop to plant this season: Wheat.'
    ]);
  }, []);

  useEffect(() => {
    // Simulated Weather Fetching
    setWeather({ temp: '30°C', condition: 'Sunny', forecast: 'Rain expected in 2 days' });
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">Farmer Dashboard</h1>
      
      {/* AI Insights */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-green-300">AI-Powered Farming Insights</h2>
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
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-green-300">Location-Based Insights</h2>
        <input 
          type="text" 
          placeholder="Enter town, PIN code, or location" 
          className="mt-3 p-3 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:outline-none shadow-md"
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
        />
        <p className="mt-3 text-lg">Localized insights will be displayed here based on: <span className="text-green-300">{location || 'your location'}</span></p>
      </div>
    </div>
    </>
  );
}
