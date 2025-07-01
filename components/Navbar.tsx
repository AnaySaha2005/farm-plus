'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}><h1 className="text-2xl font-bold">FarmPlus</h1></Link>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
        
        {/* Mobile Menu */}
        <div
          className={`absolute top-16 left-0 w-full bg-gray-800 p-4 md:hidden transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}
        >
          <ul className="space-y-4">
            <li><Link href="/about" className="block py-2 px-4 hover:bg-gray-600 rounded-md transition">About</Link></li>
            <li><Link href="/contact" className="block py-2 px-4 hover:bg-gray-600 rounded-md transition">Contact</Link></li>
            <li><Link href="/login" className="block py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-gray-600 transition">Login</Link></li>
          </ul>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/about" className="py-2 px-4 hover:bg-gray-600 rounded-md transition">About</Link></li>
          <li><Link href="/contact" className="py-2 px-4 hover:bg-gray-600 rounded-md transition">Contact</Link></li>
          <li><Link href="/login" className="bg-white text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}