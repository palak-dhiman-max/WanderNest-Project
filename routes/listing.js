 //restucturing all the rotes kuki hamare pass jab project bada hoga to bohot sare rotes honge 
 //and we do'nt want to mix them unko organise karne ke liye ham alag files me sabhi rotes define
 //karenge


 const express = require("express");
 const router = express.Router();

//for checking login before creating listing
 const {islogged} = require("../middleware.js");

//requiring from utlis for error handling
 const asyncwrap = require("../utils/asyncwrap.js");

//requiring middleware  jo owner hoga vahi delete edit kar payega post ko
const {isOwner}=require("../middleware.js");

//requiring listing controller
const listingController = require("../controllers/listing.js");

//requiring multer for parsing files in order to store file images
const multer  = require('multer')


const {storage}=require("../cloud_config.js");
const upload = multer({ storage });


//we use router.route() in order to compact the code the routes whose request path is same 
//can be written together no need to separatly define them


//index route
router.get("/",asyncwrap(listingController.index));

//serach route
router.get("/search",asyncwrap(listingController.search));


//filter route
router.post("/filter",asyncwrap(listingController.filter1));

//filter-category route
router.get("/filter/:category",asyncwrap(listingController.filter));


//new route
router.get("/new",islogged, listingController.newRoute);


//create route

router
.post("/create",islogged,upload.single('image'),asyncwrap( listingController.createRoute));


//show route ,update route , delete route

router.route("/:id")
.get(asyncwrap( listingController.showRoute))
.put(islogged,isOwner,upload.single('image'),asyncwrap( listingController.updateRoute))
.delete(islogged,isOwner, asyncwrap( listingController.deleteRoute))


//edit route
router.get("/:id/edit",isOwner,islogged,asyncwrap( listingController.editRoute));


module.exports = router;

