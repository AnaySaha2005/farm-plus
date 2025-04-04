import mongoose from "mongoose"
export default async function connectDB() {
    if (mongoose.connections[0].readyState) return true;
    try {
        await mongoose.connect(process.env.MONGODB_URI || "")
        console.log("MONGODB CONNECTED");
        return true;
    }
    catch (e) {
        console.log(e);

    }
}