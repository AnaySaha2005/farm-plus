"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
interface Listing {
  crop: string;
  price: number;
  image: string;
  farmer: {
    name: string;
    phone: string;
  };
}

export default function Buy() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,setSearch]=useState<string>("")
  useEffect(() => {
    const toastId = toast.loading("Loading listings...");

    async function getListing() {
      try {
        const res = await axios.get("/api/listings", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setListings(res.data);
      } catch (err) {
        toast.error("Failed to load listings");
      } finally {
        toast.dismiss(toastId);
        setLoading(false);
      }
    }

    getListing();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Available Crop Listings</h1>
        <span className="w-full max-w-md mx-auto flex items-center gap-2 p-3 bg-gray-900 rounded-2xl shadow-lg">
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by crop / farmer"
            className="flex-1 rounded-xl bg-gray-800 border border-gray-700 px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </span>


        {loading ? (
          <p className="text-gray-400">Fetching data...</p>
        ) : listings.length === 0 ? (
          <p className="text-gray-400">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              listing.crop.toLowerCase().includes(search) || listing.farmer.name.toLowerCase().includes(search) ? <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-md p-5 hover:shadow-xl transition flex flex-col justify-between"
              >
                <img
                  src={listing.image}
                  alt={listing.crop}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />

                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-green-400">
                    {listing.crop}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Price: ₹{listing.price} /kg
                  </p>
                </div>

                <div className="border-t border-gray-700 mt-4 pt-3">
                  <p className="text-md font-semibold">
                    👨‍🌾 {listing.farmer?.name || "Unknown Farmer"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    📞 {listing.farmer?.phone || "N/A"}
                  </p>
                </div>
              </div> :""
              
            ))}
          </div>
        )}
      </div>
    </>
  );
}
