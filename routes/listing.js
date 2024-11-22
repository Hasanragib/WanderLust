const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utility/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { checkTrendingListings } = require('../Utility/filterLogic.js');

router
    .route("/")
    .get(wrapAsync(listingController.index))            //Index Route.
    .post(isLoggedIn,                                   //Create new route.
    upload.single("listing[image]"),
    validateListing,
    wrapAsync (listingController.createdNewForm));    

//Create(New & Create Route).
// 1-New.
router.get("/new", isLoggedIn, listingController.newForm);

router.route("/:id")
.get(wrapAsync (listingController.showForm))                                       //Show route.
.put(                                                                              //Update route.
    isLoggedIn,                                                                 
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync  (listingController.updateEdit))              
.delete(isLoggedIn, isOwner, wrapAsync  (listingController.destroyYourListing));   //Destroy route.


//Update(edit & update route).
// 1- edit.
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync  (listingController.editOpen));

// Manual Trigger the trending listings.
// router.get('/:id/update-trending', async (req, res) => {
//     try {
//         await checkTrendingListings();
//         res.send("Trending listings updated successfully!");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error updating trending listings.");
//     }
// });


module.exports = router;