import {mongoose,models} from 'mongoose'
const traderSchema=new mongoose.Schema({
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
}
},{timestamps:true})
const Trader=models.Trader||mongoose.model("Trader",traderSchema);
export default Trader
