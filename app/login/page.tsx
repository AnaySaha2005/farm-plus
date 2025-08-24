"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const countryOptions = [
  { code: "+1", label: "USA" }, // 10 digits
  { code: "+91", label: "India" }, // 10 digits
  { code: "+234", label: "Nigeria" }, // 10 digits
  { code: "+92", label: "Pakistan" }, // 10 digits
  { code: "+20", label: "Egypt" }, // 10 digits
  { code: "+62", label: "Indonesia" }, // 10 digits
  { code: "+55", label: "Brazil" }, // 10 digits (most numbers)
  { code: "+81", label: "Japan" }, // 10 digits (landline)
];

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [otpVerification, setOtpVerification] = useState(false);
  const [viewOtpBar, setViewOtpBar] = useState(false);
  const [serverOtp, setServerOtp] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (!otpVerification) {
        toast.error("Please verify OTP first");
        return;
      }

      await axios
        .post("/api/login", {
          phone: phone,
          countryCode: countryCode,
          location, // { latitude, longitude }
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          toast.success("Logged In Successfully!!!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error("Error during login");
    }
  };
 
  const verifyOtp = () => {
    if (serverOtp == otp) {
      setOtpVerification(true);
      toast.success("OTP Verified Successfully");
    } else toast.error("OTP is Wrong");
  };

  const sendOtp = async () => {
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast.error("Invalid Phone Number");
      return;
    }
    console.log(phone)
    const t = await axios.post("api/generateOtp", {
      phone: countryCode + phone,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setServerOtp(t.data.otp);
    toast.success("OTP Sent Successfully");
    setViewOtpBar(true);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
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
          <h2 className="text-2xl font-bold text-center mb-4 text-green-400">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Headless UI Listbox for country code */}
                <Listbox value={countryCode} onChange={setCountryCode}>
                  <div className="relative w-full max-w-[96px]">
                    <Listbox.Button className="w-full p-2 text-xs border border-gray-600 bg-gray-700 text-white rounded-md text-left">
                      {countryOptions.find((c) => c.code === countryCode)?.code}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg text-xs max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-900">
                      {countryOptions.map((country) => (
                        <Listbox.Option
                          key={country.code}
                          value={country.code}
                          className={({ active }) =>
                            `cursor-pointer select-none p-2 ${active
                              ? "bg-green-600 text-white"
                              : "text-gray-200"
                            }`
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
                  className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none h-9"
                  required
                />

                <button
                  onClick={sendOtp}
                  type="button"
                  className="text-xs w-full sm:w-32 bg-green-600 text-white py-2 px-2 rounded-md hover:bg-green-700 transition-all duration-300"
                >
                  Send OTP
                </button>
              </div>

              {viewOtpBar && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 my-1">
                  <input
                    placeholder={
                      "Enter the otp sent on xxx" +
                      phone.substring(phone.length - 4, phone.length)
                    }
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 my-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <button
                    onClick={verifyOtp}
                    type="button"
                    className="w-full sm:w-16 h-10 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                type="submit"
                className="w-full sm:w-32 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300"
              >
                Login
              </button>
              <Link
                className="w-full sm:w-20 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300 text-center"
                href="/signup"
              >
                SignUp?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
