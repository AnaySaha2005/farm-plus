// app/api/login/route.js
import { encrypt } from "@/lib/jwt";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Farmer from "@/models/farmerSchema";
import Trader from "@/models/traderSchema";

export async function POST(req: Request) {
  const { phone, location, countryCode } = await req.json();
  await connectDB();
  let user = await Farmer.findOne({ phone });
  if (user != null && user.countryCode != countryCode) user = null;
  let role = "farmer";

  if (!user) {
    user = await Trader.findOne({ phone });
    if (user?.countryCode != countryCode) user = null;
    if (user) role = "trader";
  }

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  const token = await encrypt({
    role: role,
    id: user._id.toString(),
    location,
  });

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("session", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 30, // 30 mins
  });

  return res;
}
