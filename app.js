if(process.env.NODE_ENV != "production") { 
    require('dotenv').config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./Utility/ExpressError.js");
const session = require("express-session"); 
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const MongoStore = require('connect-mongo');

const ListingRoute = require("./routes/listing.js");
const ReviewRoute = require("./routes/reviews.js");
const UserRoute = require("./routes/user.js"); 

//connect to Mongo.
require('dotenv').config();
const dbUrl = process.env.ATLASDB_URL;

main()
    .then( () => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

//views Folder path set.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

//static folder path.
app.use(express.static(path.join(__dirname,"/public")));

//parse data.
app.use(express.urlencoded({ extended: true }));

//methodOverride.
app.use(methodOverride("_method"));

//ejsMate.
app.engine("ejs", ejsMate);   

//for MongoSessions.
const store = MongoStore.create ({
    mongoUrl: dbUrl,
    crpto: { 
    secret: process.env.SECRET
},
    touchAfter: 24 * 3600,
});
//Error handling in mongo session store.
store.on("error", () => {
    console.log("Error in Mongo Session Store", err);
});

// for sessions & cookie.
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true  
    },
};
app.use(session(sessionOptions));

//Using Flash Messages.
app.use(flash());

//using passport.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash msg & req.user info.
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// route to Listings in listing.js.
app.use("/listings", ListingRoute);

// route to Reviews in reviews.js.
app.use("/listings/:id/reviews", ReviewRoute);

//route for User in Users.js.
app.use("/", UserRoute);    

//if page not found.
app.all("*", (req, res, next) => {
    next(new ExpressError (404, "page not found"));
});

//error handling middleware.
app.use((err, req, res, next)=> {
    let { statusCode, message } = err;
    res.render("Error.ejs", {message});
});

//connect to port.
app.listen(8080, () => {
    console.log("server is listening");
});

//checking route.
// app.get("/", (req,res) => {
//     res.send("I am root");
// });
