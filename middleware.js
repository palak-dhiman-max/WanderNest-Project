//requiring collection listing
const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.islogged = async (req , res ,next)=>{

       //if user is logged in tabhi vo create kar payega listing ko
    if(!req.isAuthenticated()){

         req.session.redirectUrl = req.originalUrl;
       
        req.flash("error","You must be logged in to create listing!");
       return  res.redirect("/login");
        }

        next();
}

module.exports.locals1 = async (req,res,next)=>{
  
    res.locals.redirectUrl = req.session.redirectUrl;

    next();
}

module.exports.isOwner= async (req,res,next)=>{

    let { id } = req.params;
    let list = await Listing.findById(id);

  if(!list.owner._id.equals(res.locals.current._id)){
      req.flash("error","You are not the owner of this listing");
     return res.redirect(`/listings/${id}`);
  }
    next();
}


module.exports.isAuthor= async (req,res,next)=>{

    let { id , reviewid } = req.params;
   
    let reviews = await Review.findById(reviewid);

  if(!reviews.author._id.equals(res.locals.current._id)){
      req.flash("error","You are not the author of this review");
     return res.redirect(`/listings/${id}`);
  }
    next();
}