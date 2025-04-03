'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+1');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log({ name, phone, countryCode });
        // Handle login submission, e.g., send data to the backend
        
    };

    return (
        <>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96 border border-gray-700">
                <h2 className="text-2xl font-bold text-center mb-4 text-green-400">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                        <div className="flex space-x-2">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-300 ease-in-out"
                            >
                                <option value="+1">+1 (USA)</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+61">+61 (Australia)</option>
                                <option value="+81">+81 (Japan)</option>
                            </select>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                    <button
                        type="submit"
                        className="  w-32 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300"
                    >
                        Login
                    </button>
                    <Link  className=" w-20 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300 text-center" href="/signup">SignUp?</Link>
                    </div>
                 
                </form>
            </div>
        </div>
    </>
    );
}