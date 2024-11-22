const listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./Utility/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");


//middleware- check wheather user is logged in or not before modifications in listings. 
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Login first to create listing!");
        return res.redirect("/login");
    }
    next();
};

//middlware to redirect to the page requested before login. 
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

//middleware to check currUser is owner of listing or not.
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listings = await listing.findById(id);
    if(!listings.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You dont have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//middleware to check currUser is author of review or not.
module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let Reviews = await Review.findById(reviewId);
    if(!Reviews.author.equals(res.locals.currUser._id)) {
        req.flash("error", "Sorry, you don't have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//function for data Validation for Listings.
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    }else {
        next();
    }
};

//function for data Validation for Review.
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    }else {
        next();
    }
};