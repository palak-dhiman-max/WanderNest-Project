
const errorhandler = require("../utils/errrorhandler.js");
const User = require("../models/user.js");


//signup form route
module.exports.signupForm = (req, res) => {
    res.render("user/signup.ejs");
}


//signup route
module.exports.signup = async (req, res) => {

    try {


        let { username, email, password } = req.body;


        //creating new user
        const newuser = new User({
            email, username
        })

        //it will check if user is registered or not if not so it register the user and srtore automatically in db user credentials
        const registeruser = await User.register(newuser, password);

        //we want that when user is signed up so it automatically logged in

        req.logIn(registeruser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "You logged in successfully!");
            res.redirect("/listings");
        })
    } catch (error) {

        req.flash("error", error.message);
        res.redirect("/signup");

    }
}

//login form route
module.exports.loginForm = (req, res) => {
    res.render("user/login.ejs");
}

//login route
module.exports.login = async (req, res) => {

    //here we are using locals becuse passport here  by default delete the info from the session
    //so we firstly store thatv info in locals before deleting from session 
    req.flash("success", "Welcome back to WanderNest!");
    let RedirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(RedirectUrl);
}

//logout route

module.exports.logout = (req, res) => {

    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
    })
}