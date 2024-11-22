// Function to escape special regex characters.  
function escapeRegex(text) {  
    if (typeof text !== 'string') return '';  
    return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&'); // Escape special characters  
}  

module.exports = { escapeRegex };  