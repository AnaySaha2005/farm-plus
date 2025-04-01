import "../app/globals.css"; // Import Tailwind styles
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SettingsMenu from "@/components/SettingsMenu";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
    <div className="bg-white dark:bg-darkGreen transition-colors min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Settings Button */}
      <SettingsMenu />
    </div>
  </ThemeProvider>
  );
}
