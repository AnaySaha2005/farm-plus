import connectDB from "@/lib/mongoose";
import Farmer from "@/models/farmerSchema"
export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (body.role === "Farmer") {
            await connectDB().catch((err)=>{throw err});
            const f = await new Farmer({ name: body.name, phone: body.phone })
            ///BEFORE SAVE CHECK IF THE NUMBER IS VALID BY OTP
            await f.save();
            return Response.json("saved")
        }
        else {
            return Response.json(body.role)
        }
    } catch (error) {
        console.log(error);
        return Response.json(error, { status: 400 })
    }
}
export async function GET(request: Request) {
    return Response.json("hello")
}