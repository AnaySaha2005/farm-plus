import { getSession } from "@/helper/getSession";
import { decrypt } from "@/lib/jwt";
import connectDB from "@/lib/mongoose";
import Listing from "@/models/listingSchema";
import { cookies } from "next/headers";

export async function PUT(
  request: Request,
  { params }: { params: { id: String } }
) {
  const body = await request.json();
  const session = await getSession();
  const data = await decrypt(session?.value);
  const role = data.role;
  await connectDB();
  try {
    if (role == "farmer") {
   
      const id = (await params).id;
      let res;
      res = await Listing.findById(id);
      if (res) {
        res.price = body.Price;
        res.crop = body.Crop.toLowerCase();
        await res.save();
        return Response.json({ status: 200 });
      }
    }
  } catch (e) {
    return Response.json({ status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: String } }
) {
  const session = await getSession();
  const data = await decrypt(session?.value);
  const role = data.role;
  await connectDB();
  try {
    if (role == "farmer") {
      const id = (await params).id;
      let res;
      res = await Listing.findByIdAndDelete(id);
      if (res) {
        return Response.json({ status: 200 });
      }
    }
  } catch (e) {
    return Response.json({ status: 500 });
  }
}
