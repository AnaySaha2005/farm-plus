'use client';

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-900 text-white p-6">
            {/* About Header */}
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold text-green-400">About FarmPlus</h1>
                <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
                    FarmPlus is an AI-powered smart farming assistant that helps farmers and traders with real-time insights, disease detection, and marketplace connections.
                </p>
            </section>

            {/* Mission Section */}
            <section className="py-12 px-6 bg-gray-800 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-green-300">Our Mission</h2>
                <p className="text-gray-400 mt-4">
                    FarmPlus is an innovative smart farming platform that empowers farmers with AI-driven insights to make optimal crop choices based on seasonal trends and market demands. With real-time data on weather, soil conditions, and farming trends, farmers can enhance productivity and minimize risks. Additionally, FarmPlus enables farmers to list their harvested crops for sale, allowing traders to browse available produce and connect directly with sellers. This seamless marketplace bridges the gap between farmers and traders, ensuring fair pricing and efficient trade, ultimately fostering a smarter and more connected agricultural ecosystem.  </p>
            </section>

            {/* Features Section */}
            <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-green-300">AI Insights</h3>
                    <p className="mt-2 text-gray-400">Receive AI-driven recommendations for crops, fertilizers, and pest management.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-green-300">Weather Updates</h3>
                    <p className="mt-2 text-gray-400">Stay informed with real-time weather conditions and forecasts.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-green-300">Marketplace</h3>
                    <p className="mt-2 text-gray-400">Trade crops efficiently with nearby farmers and traders.</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-12 px-6 text-center">
                <h2 className="text-2xl font-bold text-green-400">Get in Touch</h2>
                <p className="text-gray-300 mt-2">Have questions? Reach out to us for more information.</p>
                <Link href="/contact"><button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Contact Us</button></Link>
            </section>
        </div>
        </>
    );
}
