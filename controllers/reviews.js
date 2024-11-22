const Review = require("../models/review.js");
const listing = require("../models/listing.js");

//post a review.
module.exports.postReview = async(req,res) => {
    let allListings = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    allListings.review.push(newReview);
    await newReview.save();
    await allListings.save();
    req.flash("success", "New Review Added!");
    res.redirect(`/listings/${allListings._id}`);
};

//delete or destroy reviews.
module.exports.destroyReview = async(req,res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate( id, {$pull: {review: reviewId}} );
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};