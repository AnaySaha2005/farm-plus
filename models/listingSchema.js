const {mongoose, models } = require("mongoose");

const listingSchema=mongoose.Schema({
    crop:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    farmer:{
         type:mongoose.Schema.ObjectId,
         ref:"Farmer"
    },
    image:{
        type:String
    }
});
const Listing=models.Listing||mongoose.model("Listing",listingSchema);
module.exports=Listing