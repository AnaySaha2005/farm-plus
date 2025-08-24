"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Listbox } from "@headlessui/react";

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

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [role, setRole] = useState("farmer");
  const router = useRouter();
  const [otpVerification, setOtpVerification] = useState(false);
  const [viewOtpBar, setViewOtpBar] = useState(false);
  const [otp, setOtp] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // console.log({ name, phone, countryCode, role });
    try {
      if (phone.length != 10) {
        toast.error("Invalid Phone Number");
        return;
      }
      // console.log(otpVerification);
      if (otpVerification) {
        const res = await axios.post("api/signup", {
          name: name,
          phone: phone,
          countryCode: countryCode,
          role: role,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Handle form submission, e.g., send data to the backend
        // console.log(res);
        if (res?.data?.message) toast.error(res?.data?.message);
        else {
          toast.success("Signed Up Successfully. Redirecting to login...");
          setTimeout(() => {
            router.push("/login");
          }, 2000); // 5000ms = 5s
        }

        // setTimeout(()=>{router.push('/login'),3000})
      } else {
        toast.error("Verify number first");
      }
    } catch (error) {
      console.dir(error);

      toast.error("Error during signup");
      // alert("An error occurred during signup. Please try again.");
    }
  };
  let [serverOtp, setServerOtp] = useState("");
  const verifyOtp = () => {
    if (serverOtp == otp) {
      setOtpVerification(true);
      toast.success("OTP Verified Successfully");
    } else toast.error("OTP is Wrong");
  };
  const sendOtp = async () => {
    const t = await axios.post("api/generateOtp", {
      phone: countryCode + phone,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(t);
    setServerOtp(t.data.otp);
    toast.success("OTP Sent Successfully");
  };


  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-2 sm:p-4 overflow-x-hidden">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-xs sm:max-w-md border border-gray-700 max-h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-green-400">
            Sign Up
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
                  <div className="relative w-24">
                    <Listbox.Button className="w-full p-2 text-xs border border-gray-600 bg-gray-700 text-white rounded-md text-left">
                      {countryOptions.find((c) => c.code === countryCode)?.code}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full min-w-full bg-gray-800 rounded-md shadow-lg text-xs max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-900">
                      {countryOptions.map((country) => (
                        <Listbox.Option
                          key={country.code}
                          value={country.code}
                          className={({ active }) =>
                            `cursor-pointer select-none p-2 ${
                              active
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
                  className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
                <button
                  onClick={() => {
                    if (phone.length != 10 || !/^\d+$/.test(phone))
                      toast.error("Invalid Phone Number");
                    else {
                      sendOtp();
                      setViewOtpBar(true);
                    }
                  }}
                  type="button"
                  className="text-xs w-full sm:w-32 bg-green-600 text-white py-2 px-2 rounded-md hover:bg-green-700 transition-all duration-300"
                >
                  Send OTP
                </button>
              </div>
              {viewOtpBar ? (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 my-1">
                  <input
                    placeholder={
                      "Enter the otp send on the xxx" +
                      phone.substring(phone.length - 4, phone.length)
                    }
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
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="farmer">Farmer</option>
                <option value="trader">Trader</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                type="submit"
                className="w-full sm:w-32 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300"
              >
                Signup
              </button>
              <Link
                className="w-full sm:w-20 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300 text-center"
                href="/login"
              >
                Login?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
