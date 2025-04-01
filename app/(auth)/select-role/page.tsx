"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectRole() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<"farmer" | "trader" | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (name && role) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userRole", role);
      router.push(`/dashboard/${role}`); // Navigate to respective dashboard
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-darkGreen text-gray-900 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4">Enter Your Details</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-greyBlack text-black dark:text-white mb-4"
      />

      <div className="flex gap-4">
        <button
          className={`px-6 py-2 rounded-md transition ${
            role === "farmer" ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-greyBlack"
          }`}
          onClick={() => setRole("farmer")}
        >
          Farmer 🚜
        </button>
        <button
          className={`px-6 py-2 rounded-md transition ${
            role === "trader" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-greyBlack"
          }`}
          onClick={() => setRole("trader")}
        >
          Trader 📈
        </button>
      </div>

      <button
        onClick={handleContinue}
        disabled={!name || !role}
        className={`mt-4 px-6 py-2 text-white rounded-md transition ${
          name && role ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
