//listing 1st Model here.

const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title: { 
        type: String,
        required: true
    },
    description: String,
    image:{
        filename: {
        type: String,
        default: "listingimage",
        },
        url: {
        type: String,
        default:"https://images.unsplash.com/photo-1532892939738-86e29515dc9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        },   
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        },
    },
    category: {
        type: String,
        enum: ["Room","Top-cities","Mountains","Castles","Amazing-pool","Camping","Farms","Arctic"],
        required: true
    },
    trending: {
        type: Boolean,
        default: false
    },
});


// //post-mongoose middleware. to delete reviews
// listingSchema.post("findOneAndDelete", async(listing) => {
//     if(listing) {
//         await Review.deleteMany({_id: { $in: listing.review}});
//     }
// });


const listing = mongoose.model("listing", listingSchema);

module.exports = listing;