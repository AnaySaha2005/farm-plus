import mongoose from 'mongoose'
const farmerSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
phone:{
    type:Number,
    required:true,
}
},{timestamps:true})
const Farmer=mongoose.model("Farmer",farmerSchema);
export default Farmer
