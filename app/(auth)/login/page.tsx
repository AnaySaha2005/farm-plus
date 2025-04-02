"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleSendOTP = () => {
    if (phone.length === 10) {
      // Backend API call should be made here
      console.log("OTP Sent to", phone);
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      console.log("OTP Verified");
      router.push("/auth/select-role"); // Navigate to role selection
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-darkGreen text-gray-900 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4">{otpSent ? "Enter OTP" : "Login with Phone"}</h1>

      {!otpSent ? (
        <div className="flex flex-col gap-4">
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-greyBlack text-black dark:text-white"
          />
          <button
            onClick={handleSendOTP}
            className="px-6 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
          >
            Get OTP
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-greyBlack text-black dark:text-white"
          />
          <button
            onClick={handleVerifyOTP}
            className="px-6 py-2 bg-green-600 text-white rounded-md transition hover:bg-green-700"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}
