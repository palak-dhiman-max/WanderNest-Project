
  //requiring mongoose
 const mongoose = require("mongoose");
 
 //connect db to js
  main().then(()=>{
     console.log("connected successfully");
  }).catch((err)=>{
      console.log(err);
  })
  async function main(){
      await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  }

  //requiring schema
 const Listing = require("../models/listing.js");

 //requiring data
 const initdata = require("./data.js");


 let sampledata = async ()=>{
  

    await Listing.deleteMany({});
     initdata.data = initdata.data.map((obj)=>({
        ...obj,
        owner:"6a194f962ceaada9a70e52da"
    }))

     await Listing.insertMany(initdata.data);
 }

 sampledata();
