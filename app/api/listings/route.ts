import { decrypt } from "@/lib/jwt";
import connectDB from "@/lib/mongoose";
import Farmer from "@/models/farmerSchema";
import Listing from "@/models/listingSchema";
import { cookies } from "next/headers";
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const data = await decrypt(session?.value);
  const role = data.role;
  await connectDB();
  let result = [];
  if (role == "trader") {
    result = await Listing.find({}).populate("farmer");
    return Response.json(result, { status: 200 });
  } else {
    result = await Farmer.findById(data.id).populate("list");
    return Response.json(result.list, { status: 200 });
  }
  // console.log(result.list)
}
export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const data = await decrypt(session?.value);
  const role = data.role;
  await connectDB();
  try {
    if (role == "farmer") {
      const listing = new Listing({
        image:await uploadImage(body.Crop_img),
        crop: body.Crop.toLowerCase(),
        price: body.Price,
        farmer: data.id,
      });
      const res = await listing.save();
      await Farmer.findByIdAndUpdate(data.id, { $push: { list: res._id } });
      return Response.json({ status: 200 });
    }
  } catch (e) {
    return Response.json({ status: 500 });
  }
}


