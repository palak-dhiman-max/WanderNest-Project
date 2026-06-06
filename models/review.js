 const mongoose = require("mongoose");

const schema = mongoose.Schema({

    comment:String,
    rating:{

        type:Number,
        min:1,
        max:5

    },

    author:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Review = mongoose.model("Review",schema);
module.exports = Review;