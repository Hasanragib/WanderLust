# [Vacation Rental Platform](https://wanderlust-czsl.onrender.com/listings) 
   https://github.com/user-attachments/assets/8e9226ed-952c-4f0d-a6db-5bb0342a0943
 
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

- **User Authentication:** Users can sign up, log in, and log out securely. Passwords are hashed.
- **Passport:** Used passport.js for sign-up and log-in security.
- **Joi:** Used for Schema and data validation.
  
    ![Signup](https://github.com/user-attachments/assets/3980969c-5f53-4dc8-8779-0f689e6a736f)
  
    ![login](https://github.com/user-attachments/assets/273cbba8-e119-4431-bde9-ee2c26f50a46)
  
- **Search Listings:** Users can search for accommodations.
  
   ![Homepage](https://github.com/user-attachments/assets/d17c3392-e0c3-4b48-b3a9-c19c88bebeb4)

- **View Listings:** Users can view detailed information about each accommodation, including photos, descriptions, amenities.
  
   ![ListingEditDelete](https://github.com/user-attachments/assets/0917804c-48aa-47d7-9f6d-644cde3a7568)

- **Create Listings:** Users can create property listings for renting-out.

   ![addNewListings](https://github.com/user-attachments/assets/014dba10-61ab-4701-b6f8-09e49bb9973e)

- **Update Listings:** We can update the property listed details any time we want.
  
    ![Editlisting](https://github.com/user-attachments/assets/e158f197-e968-431c-860c-b331e18ca46d)

- **Reviews:** You can give reviews and ratings to properties and check them also before booking and check location also of the property.

   ![addreviews](https://github.com/user-attachments/assets/d54a9ba8-d33a-4b8c-8b32-b431fb01cd5f)

## Technologies

- **MongoDB:** NoSQL database for storing user data, listings.
- **Express.js:** Web application framework for building the backend server.
- **EJS Templates:** templating to generate HTML Markup, allowing you to embed JavaScript into HTML pages.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **Cloudinary:** Cloud-based image management for storing and serving images.
- **Mapbox GL JS:** For Map functionality.
- **Render:** for Hosting the website.
