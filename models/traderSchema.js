import mongoose from 'mongoose'
const traderSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
phone:{
    type:Number,
    required:true,
}
},{timestamps:true})
const Trader=mongoose.model("Trader",traderSchema);
export default Farmer
