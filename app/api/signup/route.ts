import connectDB from "@/lib/mongoose";
import Farmer from "@/models/farmerSchema";
import Trader from "@/models/traderSchema";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (body.role === "farmer") {
            await connectDB();

            let existing = await Trader.findOne({ phone: body.phone});
            existing = existing || await Farmer.findOne({ phone: body.phone });

            if (existing) {
                return Response.json({ status: 400, message: "Farmer already exists" });
            }
            // Create a new farmer
            const f = new Farmer({ name: body.name, phone: body.phone ,countryCode:body.countryCode});
            await f.save();
            return Response.json({ status: 200 });

        } else {
            // trader
            await connectDB();

            let existing = await Trader.findOne({ phone: body.phone });
            existing = existing || await Farmer.findOne({ phone: body.phone });

            if (existing) {
                return Response.json({ status: 400, message: "Trader already exists" });
            }

            // Create a new trader
            const f = new Trader({ name: body.name, phone: body.phone,countryCode:body.countryCode });
            await f.save();
            return Response.json({ status: 200 });
        }
    } catch (error) {
        console.log(error);
        return Response.json(error, { status: 400 });
    }
}