'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Listbox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const countryOptions = [
  { code: '+1', label: 'USA' },        // 10 digits
  { code: '+91', label: 'India' },     // 10 digits
  { code: '+234', label: 'Nigeria' },  // 10 digits
  { code: '+92', label: 'Pakistan' },  // 10 digits
  { code: '+20', label: 'Egypt' },     // 10 digits
  { code: '+62', label: 'Indonesia' }, // 10 digits
  { code: '+55', label: 'Brazil' },    // 10 digits (most numbers)
  { code: '+81', label: 'Japan' },     // 10 digits (landline)
];

export default function Login() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post('/api/login', {
                name,
                phone,
                countryCode,
                location, // { latitude, longitude }
            });
            // handle success (e.g., redirect or show toast)
        } catch (error) {
            // handle error (e.g., show toast)
        }
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                setLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            });
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-2 sm:p-4 overflow-x-hidden">
                <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-xs sm:max-w-md border border-gray-700">
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
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Headless UI Listbox for country code */}
                                <Listbox value={countryCode} onChange={setCountryCode}>
                                    <div className="relative w-full max-w-[96px]">
                                        <Listbox.Button className="w-full p-2 text-xs border border-gray-600 bg-gray-700 text-white rounded-md text-left">
                                            {countryOptions.find(c => c.code === countryCode)?.code}
                                        </Listbox.Button>
                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg text-xs max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-900">
                                            {countryOptions.map((country) => (
                                                <Listbox.Option
                                                    key={country.code}
                                                    value={country.code}
                                                    className={({ active }) =>
                                                        `cursor-pointer select-none p-2 ${active ? 'bg-green-600 text-white' : 'text-gray-200'}`
                                                    }
                                                >
                                                    {country.code} ({country.label})
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between gap-2'>
                            <button
                                type="submit"
                                className="w-full sm:w-32 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300"
                            >
                                Login
                            </button>
                            <Link className="w-full sm:w-20 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300 text-center" href="/signup">SignUp?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}