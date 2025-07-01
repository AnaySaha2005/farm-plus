'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-green-400">Welcome to FarmPlus</h1>
        <p className="text-lg text-gray-300 mt-4">AI-driven insights, marketplace, and disease detection for smart farming.</p>
        <Link href={"/about"}><button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Get Started</button></Link>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-300">AI Insights</h3>
          <p className="mt-2 text-gray-400">Get AI-powered farming recommendations for crops, pests, and fertilizers.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-300">Disease Detection</h3>
          <p className="mt-2 text-gray-400">Upload crop images to detect diseases using AI.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-300">Marketplace</h3>
          <p className="mt-2 text-gray-400">Buy and sell crops directly with farmers and traders.</p>
        </div>
      </section>

      {/* Signup Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-green-400">Join FarmPlus Today</h2>
        <p className="text-gray-300 mt-2" >Sign up with your phone number and choose your role to start.</p>
        <Link href="/signup" > <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Sign Up</button> </Link>
      </section>
    </div>
    </>
  );
}
