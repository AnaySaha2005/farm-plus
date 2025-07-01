import { cookies } from 'next/headers';
import connectDB from "@/lib/mongoose";
import Farmer from "@/models/farmerSchema";
import Trader from "@/models/traderSchema";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, countryCode, location } = body;

        await connectDB();

        // Try to find user in Farmer or Trader collections
        let user = await Farmer.findOne({ phone });
        let role = "farmer";
        if (!user) {
            user = await Trader.findOne({ phone });
            if (user) {
                role = "trader";
            }
        }

        if (!user) {
            return Response.json({ status: 404, message: "User not found" });
        }

        // Save user info and location in cookies
        const cookieStore = await cookies();
        cookieStore.set('name', user.name, {
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        cookieStore.set('phone', user.phone, {
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        cookieStore.set('countryCode', countryCode, {
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        cookieStore.set('role', role, {
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        if (location && location.latitude && location.longitude) {
            cookieStore.set('location', JSON.stringify(location), {
                httpOnly: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return Response.json({
            status: 200,
            message: 'Login successful',
        });
    } catch (error) {
        return Response.json({ status: 400, message: 'Login failed', error: error?.toString() });
    }
}