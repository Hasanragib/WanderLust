const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js")

//connect to Mongoose.
mongoURL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then( () => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(mongoURL);
}

const initDB = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner:"672c9cb7d8d500f121f9750b"}));
    await listing.insertMany(initData.data);
    console.log("data was Initialized");
};

initDB();