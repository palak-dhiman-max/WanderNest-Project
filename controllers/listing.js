//in order to make the code more readable and segregated  we use controllers (we write all callback here)

//requiring collection listing
const Listing = require("../models/listing.js");


//requiring from utlis for error handling
const errorhandler = require("../utils/errrorhandler.js");

//requiring joi schema for validation , when particular field is missing and rview validation
const { listingschema } = require("../joi.js");
const Review = require("../models/review.js");

//index route
module.exports.index = async (req, res) => {


    let initdata = await Listing.find({});

    let result = initdata;

    res.render("index.ejs", { result });
}

//search route
module.exports.search = async (req, res) => {

let {q} = req.query;
console.log(q);
    let result = await Listing.find({

        $or:[
            {title:{$regex :q , $options:"i"}},

             {location:{$regex :q , $options:"i"}},

              {country:{$regex :q , $options:"i"}},

        ]
    });

    if(result.length==0){
        req.flash("error","No Listings Found!");
        return res.redirect("/listings");
    }



    res.render("index.ejs", {result});



}


//filter route
module.exports.filter1 = async (req, res) => {

   let {minPrice ,maxPrice,country , location , property, aminities,rating} = req.body;

   let filter={};


   if(minPrice && maxPrice){
   
    filter.price ={
     $gte :Number(minPrice),
     $lte:Number(maxPrice)
    }

   }   
   
   if(country){
    filter.country = country;
   }

   if(location){
    filter.location = location
   }

   if(property){
    filter.category=property
   }

   if(aminities){
    filter.aminities ={
        $in:Array.isArray(aminities)?aminities:[aminities]
    }
   }

   

   let result = await Listing.find(filter);
  

       if(result.length==0){
        req.flash("error","No Listings Found!");
        return res.redirect("/listings");
    }
    
 res.render("index.ejs",{result});

}


//filter-category route
module.exports.filter = async (req, res) => {

    let {category} = req.params;
  let result=  await Listing.find({category:category});


  
    if(result.length==0){
        req.flash("error","No Listings Found!");
        return res.redirect("/listings");
    }
    
 res.render("index.ejs",{result});

}



//new route
module.exports.newRoute = (req, res) => {
    res.render("new.ejs");
}

module.exports.createRoute = async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    let result = listingschema.validate(req.body);
    if (result.error) {
        throw new errorhandler(404, result.error);
    }

    let { title, description, category, price, country, location } = req.body;

    const new1 = new Listing({
        title,
        description,
        image: { filename, url },
        category,
        price,
        country,
        location
    });

    new1.owner = req.user._id;

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
            {
                headers: {
                    "User-Agent": "Wanderlust Project"
                }
            }
        );

        const data = await response.json();   // ✅ FIXED

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            new1.geometry = {
                type: "Point",
                coordinates: [lon, lat]
            };
        }

    } catch (err) {
        console.log("Geo API failed:", err.message);
    }

    await new1.save();

    req.flash("success", "Successfully Added Listing");
    res.redirect("/listings");
};
//create route
// module.exports.createRoute = async (req, res) => {



//     let url = req.file.path;
//     let filename = req.file.filename;
//     //for validation checking every field which is required should be enetred else got error
//     let result = listingschema.validate(req.body);
//     if (result.error) {
//         throw new errorhandler(404, result.error);
//     }


//     let { title, description, image,category,price, country,location } = req.body;
//     const new1 = await Listing({
//         title: title,
//         description: description,
//         image: { filename: filename, url: url },
//         category:category,
//         price: price,
//         country: country,
//         location: location,
        
//     });

//     new1.owner = req.user._id;

//     const location1 = req.body.location;

// const response = await fetch(
//   `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location1)}&format=json&limit=1`,
//   {
//     headers: {
//       "User-Agent": "Wanderlust Project"
//     }
//   }
// );

// // const data = await response.json();

// console.log("Status:", response.status);

// const text = await response.text();
// console.log("Response:", text);


// if (data.length > 0) {
//   const lat = parseFloat(data[0].lat);
//   const lon = parseFloat(data[0].lon);


//   new1.geometry = {
//     type: "Point",
//     coordinates: [lon, lat]
// };


 
// }

//     await new1.save();

//     //flash succesfull msg
//     req.flash("success", "Successfully Added Listing");
//     res.redirect("/listings");
// }

//show route

module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate(
        {
            path: "review", populate: {
                path: "author"
            }
        })
        .populate("owner");



    if (!list) {

        req.flash("error", "Listing you requested for does'nt exist");
        return res.redirect("/listings");

    }
    res.render("show.ejs", { list });
}

//edit route
module.exports.editRoute = async (req, res) => {

    let { id } = req.params;
    let list = await Listing.findById(id);

    let originalUrl = list.image.url;

   let originalImgUrl= originalUrl.replace("/upload","/upload/w_250");
   

    if (!list) {

        req.flash("error", "Listing you requested for does'nt exist");
        return res.redirect("/listings");

    }
    res.render("edit.ejs", { list ,originalImgUrl});

}

//update
module.exports.updateRoute = async (req, res) => {

    let { id } = req.params;

    let result = listingschema.validate(req.body);
    if (result.error) {
        throw new errorhandler(400, result.error);
    }

    let { title, description,category, price, country, location,} = req.body;

    // Get coordinates from location
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
        {
            headers: {
                "User-Agent": "Wanderlust Project"
            }
        }
    );

    const data = await response.json();

    let geometry = undefined;

    if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        geometry = {
            type: "Point",
            coordinates: [lon, lat]
        };
    }

    //  update object prepare 
    let updateData = {
        title,
        description,
        category,
        price,
        country,
        location,
      
    };

    // add geometry only if found
    if (geometry) {
        updateData.geometry = geometry;
    }

    //  update listing
    let listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });

    //  image update
    if (req.file) {
        listing.image = {
            filename: req.file.filename,
            url: req.file.path
        };
        await listing.save();
    }

    req.flash("success", "Successfully Updated Listing");
    res.redirect(`/listings/${id}`);
};



//delete route

module.exports.deleteRoute = async (req, res) => {

    let { id } = req.params;


    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted Listing");
    res.redirect(`/listings`);

}