import {mongoose,models} from 'mongoose'
const farmerSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
phone:{
    type:Number,
    min : 1000000000,
    max : 9999999999,
    required:true,
},
countryCode:{
    type:String,
    required:true,
},
list:[{
    type:mongoose.Schema.ObjectId,
    ref:"Listing"
}]
},{timestamps:true})
const Farmer=models.Farmer||mongoose.model("Farmer",farmerSchema);
export default Farmer
