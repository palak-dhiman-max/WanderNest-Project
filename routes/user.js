const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportLocal = require("passport-local");
const asyncwrap = require("../utils/asyncwrap.js");
const { locals1 } = require("../middleware.js");
const userController= require("../controllers/user.js");

//signup  route
router.route("/signup")
.get(userController.signupForm)
.post( asyncwrap(userController.signup));


//login route
router.route("/login")
.get(userController.loginForm)
.post( locals1, passport.authenticate("local", {
  failureRedirect: "/login", failureFlash: true,
}), userController.login);

//logout route
router.get("/logout",userController.logout);

module.exports = router;