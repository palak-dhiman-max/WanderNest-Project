const express = require("express");
const router = express.Router({ mergeParams: true });

//requiring from utlis for error handling
const asyncwrap = require("../utils/asyncwrap.js");

//requiring review controller
const reviewController = require("../controllers/review.js");

//for checking login before creating listing
const { islogged, isAuthor } = require("../middleware.js");

//for review route 

router.post("/", islogged,asyncwrap(reviewController.reviewRoute) );

//review delete route

router.delete("/:reviewid", islogged, isAuthor, asyncwrap(reviewController.reviewDelete));

module.exports = router;