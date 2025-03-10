# Wanderlust

## Overview

A platform can be described as an online marketplace where individuals can rent out their spare rooms, apartments, or entire homes to travelers on a short-term basis, allowing guests to find unique and diverse accommodation options across the globe, all managed through a user-friendly platform that facilitates booking, communication, and secure payment processing between hosts and guests.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Hasanragib/WanderLust-clone.git

   ```

2. **Install dependencies:**

   Navigate to node_modules and install dependencies using npm

   ```
   npm install
   ```
   
3. **ENV variables:**

   - create .env file in the client folder and add these variables

    #### CLOUD_NAME= your cloud name
   
    #### CLOUD_API_KEY= your API key
   
    #### CLOUD_API_SECRET= your API secret

    #### MAP_TOKEN= token in from mapbox

    #### ATLASDB_URL= MongoDB url 

    #### SECRET= your secret session


## Technologies

1. MongoDB: NoSQL database for storing user data, listings. 
2. Express.js: Web application framework for building the backend server.
3. EJS Templates: templating to generate HTML Markup, allowing you to embed JavaScript into HTML pages.
4. Node.js: JavaScript runtime environment for executing server-side code.
5. Cloudinary: Cloud-based image management for storing and serving images.
6. Mapbox GL JS: For Map functionality.
8. Render: for Hosting the website .
