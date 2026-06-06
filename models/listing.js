 //requiring mongoose
const mongoose = require("mongoose");
const Review = require("./review");
const { required } = require("joi");



 //making schema
 const schema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        }
,
        description:{
            type:String
        }
        ,

        image:{

            filename:{
                type:String ,
                default:"listingimage",
            },

            url:{
                   type:String,

            //for setting default value agar image hi undefined hai
            default:"https://s7ap1.scene7.com/is/image/incredibleindia/vagator-beach-goa-city-1-hero?qlt=82&ts=1742158909874",

            //image to hai par empty hai 
            set:(v)=> v=== " "? "https://s7ap1.scene7.com/is/image/incredibleindia/vagator-beach-goa-city-1-hero?qlt=82&ts=1742158909874"  :v
            }
          
   
        
        }

        ,
        price:{
            type:Number
        }
        ,
        location:{
            type:String
        }
        ,
        country:{
            type:String
        },

        review:[
            
            {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Review"
            }
               ],

        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
,

        geometry: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number]
  }
}
,

category:{
    type:String,
    required:true
}
,

    }
 )

 //if i delete listing so reviews on that listing also delete automatically

 schema.post("findOneAndDelete",async(list_deleted_data)=>{

     
    if(list_deleted_data.review){

        await Review.deleteMany({_id :{$in :list_deleted_data.review}});
    }
   
    
    
 })

 //making collection listing
 const Listing = mongoose.model("Listing",schema);

 //exporting it
 module.exports = Listing;