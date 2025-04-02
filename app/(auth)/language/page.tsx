"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const languages = ["English", "हिन्दी", "বাংলা", "मराठी", "தமிழ்", "తెలుగు", "ગુજરાતી"];

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const router = useRouter();

  const handleContinue = () => {
    localStorage.setItem("language", selectedLanguage);
    router.push("/auth/login"); // Move to login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-darkGreen text-gray-900 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4">Select Your Language</h1>
      <div className="space-y-2">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`px-6 py-2 rounded-md transition ${
              selectedLanguage === lang ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-greyBlack"
            }`}
            onClick={() => setSelectedLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <button
        onClick={handleContinue}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
}
