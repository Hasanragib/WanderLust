const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../Utility/wrapAsync.js"); 
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Review  
// Post route.
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

// Delete route for Reviews.
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;