const listing = require("../models/listing.js");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeoCoding({ accessToken: mapToken }); 
const { escapeRegex }  = require("../Utility/searchRegex.js");
const { getFilterQuery} = require("../Utility/filterLogic.js");

//index functionality, all the listings.
module.exports.index = async (req,res) => {

let searchQuery = {};
let filterQuery = {};
let trendingQuery = {};  

if (req.query.search) {  
    let search = escapeRegex(req.query.search);  
    searchQuery = {  
        $or: [  
            { title: { $regex: '.*' + search + '.*', $options: 'i' } },  
            { description: { $regex: '.*' + search + '.*', $options: 'i' } },  
            { location: { $regex: '.*' + search + '.*', $options: 'i' } },  
            { country: { $regex: '.*' + search + '.*', $options: 'i' } },   
        ]  
    };    
}
if(req.query.filter) {
    // console.log(req.query.filter);
    filterQuery = getFilterQuery(req.query.filter);
    // console.log(filterQuery);
}
if (req.query.trending === 'true') {  
    trendingQuery = { trending: true };  
} 
// Combine search queries using MongoDB's $and operator  
const combinedQuery = { ...searchQuery, ...filterQuery, ...trendingQuery };  
// console.log(combinedQuery);
// Fetch all matching listings  
const allListings = await listing.find(combinedQuery); 
// console.log(allListings);

// Check if there are listings found  
if (!allListings.length) {  
    req.flash('error', 'No listings found with that search term.'); // Set a flash message  
    
    // Redirect to the last URL if it exists, otherwise redirect to the default listings page  
    res.redirect("/listings");
}  
// Render the listings page with the results  
res.render("listings/index.ejs", { allListings });  
};      

//new form.
module.exports.newForm = (req,res) => {
    res.render("listings/new.ejs");
};

//show form.
module.exports.showForm =  async (req,res) => {
    let { id } = req.params;
    const allListings = await listing.findById(id)
    .populate({
        path: "review",
        populate: {
            path: "author",
        },
    }).populate("owner");
    if(!allListings) {
        req.flash("error", "listing you requested does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { allListings });
};

//Create submit new form details in listings.
module.exports.createdNewForm = async (req,res) => {
    let response =  await geoCodingClient
    .forwardGeocode({
        query: req.body.listing.location,               //comes from new form location input.
        limit: 1
    })
    .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry;    //to save coordinates.
    console.log(newListing);
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

//opens edit form.
module.exports.editOpen = async (req,res) => {
    let { id } = req.params;
    const allListings = await listing.findById(id);
    if(!allListings) {
        req.flash("error", "listing you requested does not exist");
        res.redirect("/listings");
    }

    let originalImageUrl = allListings.image.url;                      //for Image preview Functionality.
    originalImageUrl =  originalImageUrl.replace("/upload","/upload/h_200,w_300");
    res.render("listings/edit.ejs", { allListings, originalImageUrl });
};

//update edited form.
module.exports.updateEdit = async (req,res) => {
    let { id } = req.params;
    let allListings = await listing.findByIdAndUpdate( id, { ...req.body.listing });

    if(typeof req.file !== "undefined") {
    let  url = req.file.path;
    let filename = req.file.filename;
    allListings.image = { url, filename };
    await allListings.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

//delete listings.
module.exports.destroyYourListing = async (req,res) => {
    let { id } = req.params;
    const deletedListing = await listing.findByIdAndDelete( id );
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};