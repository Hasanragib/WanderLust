# Vacation Rental Platform (Wanderlust)

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

## Features

- **User Authentication:** Users can sign up, log in, and log out securely. Passwords are hashed for security.
- **Passport:** Users can sign up and log in using passport.js 
- **Search Listings:** Users can search for accommodations.
- **View Listings:** Users can view detailed information about each accommodation, including photos, descriptions, amenities.

## Technologies

- **MongoDB:** NoSQL database for storing user data, listings.
- **Express.js:** Web application framework for building the backend server.
- **EJS Templates:** templating to generate HTML Markup, allowing you to embed JavaScript into HTML pages.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **Cloudinary:** Cloud-based image management for storing and serving images.
- **Mapbox GL JS:** For Map functionality.
- **Render:** for Hosting the website.
