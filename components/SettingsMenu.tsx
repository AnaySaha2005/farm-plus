"use client";
import { useState, useEffect } from "react";

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("English");

  // Handle Theme Change
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="fixed bottom-6 right-6">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
      >
        ⚙️
      </button>

      {/* Settings Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-darkGreen shadow-lg rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>

          {/* Theme Switcher */}
          <div className="mb-4">
            <p className="text-sm font-medium">Theme</p>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-1 w-full p-2 rounded-md bg-gray-100 dark:bg-greyBlack text-black dark:text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          {/* Language Switcher */}
          <div>
            <p className="text-sm font-medium">Language</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 w-full p-2 rounded-md bg-gray-100 dark:bg-greyBlack text-black dark:text-white"
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Bengali">বাংলা</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Marathi">मराठी</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Gujarati">ગુજરાતી</option>
              <option value="Urdu">اردو</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
