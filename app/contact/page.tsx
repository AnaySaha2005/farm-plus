'use client';

import Navbar from "@/components/Navbar";

export default function ContactUs() {
  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-400 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-2xl">
        Have any questions or need support? Feel free to reach out to us via email!
      </p>
      
      <div className="space-y-4 text-center">
        <a
          href="mailto:anaysaha2005@gmail.com"
          className="block bg-gray-800 px-6 py-3 rounded-lg shadow-md text-green-300 hover:bg-gray-700 transition"
        >
          anaysaha2005@gmail.com
        </a>
      </div>
    </div>
    </>
  );
}
