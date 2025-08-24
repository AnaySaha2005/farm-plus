import { decrypt } from "@/lib/jwt";
import connectDB from "@/lib/mongoose";
import Farmer from "@/models/farmerSchema";
import Listing from "@/models/listingSchema";
import { cookies } from "next/headers";
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
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
  const body = await request.formData();
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const data = await decrypt(session?.value);
  const role = data.role;
  await connectDB();
  try {
    if (role == "farmer") {

      const file: File | null = body.get('image') as unknown as File
     
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)
        
        const imgres = await new Promise<any>((res, rej) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "farmplus",
            },
            (error: any, result: any) => {
              if (error) rej(error)
              else res(result as any)
            }
          )

          uploadStream.end(buffer)
        })
 
        const res = await new Listing({ image: imgres.secure_url, crop: body.get("crop"), price: body.get("price"), farmer: data.id })
        await res.save();
        await Farmer.findByIdAndUpdate(data.id, { $push: { list: res } });
        
        return Response.json({ status: 200 });
      }
      const res = await new Listing({ crop: body.get("crop"), price: body.get("price"), farmer: data.id })
      await res.save();
     
      await Farmer.findByIdAndUpdate(data.id, { $push: { list: res } });
      return Response.json({ status: 200 });
    }
  } catch (e) {
    return Response.json({ status: 500 });
  }
}


