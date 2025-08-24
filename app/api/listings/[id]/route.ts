import { getSession } from "@/helper/getSession";
import { decrypt } from "@/lib/jwt";
import connectDB from "@/lib/mongoose";
import Listing from "@/models/listingSchema";
import{v2 as cloudinary}from 'cloudinary'
export async function PUT(
  request: Request,
  { params }: { params: { id: String } }
) {
  const body = await request.formData();
  const session = await getSession();
  const data = await decrypt(session?.value);
  const role = data.role;
  cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  })
  await connectDB();
  try {
    if (role == "farmer") {
      const id = (await params).id;
      let res;
      res = await Listing.findById(id);
      if (res) {
        const file:File|null= body.get('image') as unknown as File
        if(file){
          const bytes=await file.arrayBuffer();
        const buffer=Buffer.from(bytes)
        const imgres=await new Promise<any>((res,rej)=>{
          const uploadStream=cloudinary.uploader.upload_stream(
            {
              folder:"farmplus",
            },
            (error: any,result: any)=>{
              if(error)rej(error)
                else res(result as any)
            }
          )
          uploadStream.end(buffer)
        })
         res.image = imgres.secure_url;
        }
       res.crop=body.get("crop")
       res.price=body.get("price")
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
