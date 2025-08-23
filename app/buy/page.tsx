"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Listing {
  crop: string;
  price: number;
  farmer: {
    name: string;
    phone: string;
  };
}

export default function Buy() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const toastId = toast.loading("Loading listings...");

    async function getListing() {
      try {
        const res = await axios.get("/api/listings");
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

        {loading ? (
          <p className="text-gray-400">Fetching data...</p>
        ) : listings.length === 0 ? (
          <p className="text-gray-400">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-md p-5 hover:shadow-xl transition"
              >
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-green-400">
                    {listing.crop}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Price: {listing.price} /kg
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
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
