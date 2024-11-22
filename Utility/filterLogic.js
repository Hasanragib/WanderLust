// filterLogic.js  
const listing = require("../models/listing.js");

// Function to get filter query based on the category  
function getFilterQuery(filter) {  
    // Define your categories here  
    const categories = {  
       room: { category: 'Room' },  
       topcities: { category: 'Top-cities' },  
       mountains: { category: 'Mountains' },  
       castles: { category: 'Castles' },  
       amazingpool: { category: 'Amazing-pool' },  
       camping: { category: 'Camping' }, 
       farms: { category: 'Farms' },  
       arctic: { category: 'Arctic' }, 
    };  
    // console.log("Looking up filter for:", filter);  
    const normalizedFilter = filter.toLowerCase(); // Convert input to lowercase  
    const result = categories[normalizedFilter];  // Lookup using normalized input  
    // console.log("Result found:", result); 
    return result ? result : {};    
  }  
module.exports = { getFilterQuery };
