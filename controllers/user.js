const User = require("../models/user.js");

//User Sigup form.
module.exports.userSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

//submitting the User form.
module.exports.userSubmitForm =  async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User ({email, username});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=> {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        })
    }
    catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

//login User form.
module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};

//Submit login form.
module.exports.loginSubmitForm = async(req, res) => {
    req.flash("success", "Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//Signout
module.exports.Signout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        res.redirect("/listings");
    });
};