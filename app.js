if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


//requiring express
const express = require("express");

const app = express();
const port = 8080;
const path = require("path");

//importing from routes listing.js

const listingRouter = require("./routes/listing.js");

//importing from routes review.js

const reviewRouter = require("./routes/review.js");

//importing from routes user.js

const userRouter = require("./routes/user.js");

//for authentication
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/user.js");

//requiring from utlis for error handling
const asyncwrap = require("./utils/asyncwrap.js");
const errorhandler=require("./utils/errrorhandler.js");


//for using ejs-mate
const ejsmate = require("ejs-mate");
app.engine("ejs",ejsmate);

//requiring mongoose
const mongoose = require("mongoose");


//setting to use ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//for parsing to make understood ejs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//for using patch and delete
const method = require("method-override");
app.use(method("_method"));


//for using styling

app.use(express.static(path.join(__dirname, "public")));

let dburl = process.env.ATLASDB_URL;
//connecting mongodb with js
main().then(() => {
    console.log("connected successfully");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(dburl);
}

//requiring session
const session = require("express-session");

//mongo store
const  {MongoStore} = require('connect-mongo');
console.log(MongoStore);
//requiring flash
const flash = require("connect-flash");


//mongo store
const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },

    touchAfter:24*3600
})


//for error
store.on("error",()=>{
    console.log("error in store",err);
})
//utilising session
const sessionOption = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}



app.use(session(sessionOption));

//utilising flash
app.use(flash());

//for authentication intialising passport
app.use(passport.initialize());

//when user switch between pages so browser remmber the user (that this user is part of session)
app.use(passport.session());

//main fun
passport.use(new passportLocal(User.authenticate()));

//session me jo user hoga uska data store hoga
passport.serializeUser(User.serializeUser());

//session jab khatam hojega to user ko deserialize karna
passport.deserializeUser(User.deserializeUser());


//defining middleware 
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.current = req.user;
    next();
})


//listing routes
app.use("/listings",listingRouter);

//review route
app.use("/listings/:id/reviews",reviewRouter);

//user route
app.use("/",userRouter);


//starting server
app.listen(port, () => {
    console.log("server is listening at port 8080");
})


//agar hum vo route access kar rahe jo exist hi ni karta
app.use((req,res,next)=>{
    next( new errorhandler(400,"Page not found"));
})


app.use((err ,req,res,next)=>{

   
    //error handlor

    let {status=500 ,message="something went wrong"}=err;
   
    res.render("error.ejs",{message});

})