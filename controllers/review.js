 //requiring collection listing
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//requiring from utlis for error handling
const errorhandler = require("../utils/errrorhandler.js");

//requiring joi schema for validation , when particular field is missing and rview validation
const { reviewschema } = require("../joi.js");


//review route
module.exports.reviewRoute  = async (req, res) => {

//for validation checking every field which is required should be enetred else got error
  let result = reviewschema.validate(req.body);
  if (result.error) {
    throw new errorhandler(404, result.error);
  }

  let { id } = req.params;
  let list = await Listing.findById(id);

  const { rating, comment } = req.body;
  let revie = await new Review({

    rating: rating,
    comment: comment

  })

  revie.author = req.user._id;
  list.review.push(revie);

  list.review.push(revie.author);



  await revie.save();

  await list.save();

  req.flash("success", "Successfully Added Review");

  res.redirect(`/listings/${id}`)

}


//delete route
module.exports.reviewDelete = async (req, res) => {

    let { id, reviewid } = req.params;
    //jo bhi review array me se reviewid se match karega vo delete ho jayega (for deleting review from listing)
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewid } });

    //for deleting review from review collection
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Successfully Deleted Review");
    res.redirect(`/listings/${id}`);

  }