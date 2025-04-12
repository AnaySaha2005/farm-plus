import {mongoose,models} from 'mongoose'
const farmerSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
phone:{
    type:Number,
    min : 100000000,
    max : 999999999,
    required:true,
}
},{timestamps:true})
const Farmer=models.Farmer||mongoose.model("Farmer",farmerSchema);
export default Farmer
