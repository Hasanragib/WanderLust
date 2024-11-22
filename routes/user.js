const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utility/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


router.route("/signup")
.get(userController.userSignupForm)                    //User signup form opening route.
.post(saveRedirectUrl, wrapAsync(userController.userSubmitForm));       //Submit form route.


router.route("/login")
.get(userController.loginForm)                        //route to login page.
.post(saveRedirectUrl,                                //route to submit login form.
    passport.authenticate
    ("local", { failureRedirect: "/login", failureFlash: true }),
    wrapAsync(userController.loginSubmitForm));

//route for signout.
router.get("/logout", userController.Signout);

module.exports = router;