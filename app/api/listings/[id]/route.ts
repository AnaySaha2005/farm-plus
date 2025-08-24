import { getSession } from "@/helper/getSession";
import { decrypt } from "@/lib/jwt";
import connectDB from "@/lib/mongoose";
import Listing from "@/models/listingSchema";
import { v2 as cloudinary } from "cloudinary";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();

  try {
    const res = await Listing.findById(id);
    if (!res) {
      return Response.json({ status: 404, message: "Listing not found" });
    }
    return Response.json({ status: 200, data: res });
  } catch (e) {
    console.error("GET error:", e);
    return Response.json({ status: 500, message: "Server error" });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.formData();
  const session = await getSession();
  const data = await decrypt(session?.value);
  const role = data.role;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await connectDB();

  try {
    if (role === "farmer") {
      const res = await Listing.findById(id);
      if (!res) {
        return Response.json({ status: 404, message: "Listing not found" });
      }

      const file: File | null = body.get("image") as unknown as File;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const imgres = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "farmplus" },
            (error: any, result: any) => {
              if (error) reject(error);
              else resolve(result as any);
            }
          );
          uploadStream.end(buffer);
        });

        res.image = imgres.secure_url;
      }

      res.crop = body.get("crop");
      res.price = body.get("price");
      await res.save();

      return Response.json({ status: 200, data: res });
    }
    return Response.json({ status: 403, message: "Unauthorized" });
  } catch (e) {
    console.error("PUT error:", e);
    return Response.json({ status: 500, message: "Server error" });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getSession();
  const data = await decrypt(session?.value);
  const role = data.role;

  await connectDB();

  try {
    if (role === "farmer") {
      const res = await Listing.findByIdAndDelete(id);
      if (!res) {
        return Response.json({ status: 404, message: "Listing not found" });
      }
      return Response.json({ status: 200, message: "Listing deleted" });
    }
    return Response.json({ status: 403, message: "Unauthorized" });
  } catch (e) {
    console.error("DELETE error:", e);
    return Response.json({ status: 500, message: "Server error" });
  }
}
