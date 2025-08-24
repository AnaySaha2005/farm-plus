"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Listing {
  _id: string;
  crop: string;
  price: number;
  image: string;
}

export default function Sell() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState<string | null>(null); // ID of item being edited
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const toastId = toast.loading("Loading listings...");
    try {
      const res = await axios.get("/api/listings");
      setListings(res.data);
    } catch (err) {
      toast.error("Failed to load listings");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!crop.trim() || !price.trim()) {
      toast.error("Please enter all fields");
      return;
    }
    try {
      const formData = new FormData();
      if (file) formData.append("image", file);
      formData.append("crop", crop);
      formData.append("price", price);

      if (editId) {
        await axios.put(`/api/listings/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Listing updated!");
        setEditId(null);
      } else {
        await axios.post("/api/listings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Listing added!");
      }
      setCrop("");
      setPrice("");
      setFile(null);
      fetchListings();
    } catch (err) {
      toast.error("Failed to save listing");
    }
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <span>
        Are you sure?
        <button
          className="px-3 py-1 mx-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              await axios.delete(`/api/listings/${id}`);
              toast.success("Listing deleted");
              fetchListings();
            } catch (err) {
              toast.error("Failed to delete");
            }
          }}
        >
          Yes
        </button>
      </span>
    ));
  };

  const handleEdit = (listing: Listing) => {
    setCrop(listing.crop);
    setPrice(listing.price.toString());
    setEditId(listing._id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">
          {editId ? "✏️ Update Listing" : "➕ Add New Trade"}
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mb-10 bg-gray-800 p-6 rounded-xl shadow"
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white">
              Crop Image
            </label>
            <input
              type="file"
              id="crop_img"
              name="crop_img"
              accept="image/*"
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-green-600 file:text-white
             hover:file:bg-green-700
             bg-gray-700 rounded-md shadow-sm"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
              }}
            />

            <label className="block mb-2 text-sm font-medium mt-4">Crop Name</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="e.g. Potato"
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Price (per kg)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 15"
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
            >
              {editId ? "Update" : "Submit"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setCrop("");
                  setPrice("");
                  setFile(null);
                }}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* LISTINGS */}
        <h1 className="text-3xl font-bold mb-6">🌾 My Crop Listings</h1>
        {loading ? (
          <p className="text-gray-400">Fetching data...</p>
        ) : listings.length === 0 ? (
          <p className="text-gray-400">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-gray-800 rounded-xl shadow-md p-5 hover:shadow-xl transition flex flex-col justify-between"
              >
                {/* Responsive Image */}
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
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(listing)}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
