# 🏡 WanderNest

**Explore Amazing Destinations. Find Your Perfect Stay.**

WanderNest is a full-stack accommodation listing platform inspired by Airbnb, where users can discover unique stays, create property listings, share reviews, and explore locations through interactive maps. The application focuses on secure authentication, cloud image storage, location-based discovery, and a responsive user experience.

---

## 🚀 Features

### 🔐 User Authentication

* User registration and login
* Secure session management with Passport.js
* Flash messages for user feedback

### 🏠 Property Listings

* Create, edit, and delete listings
* View detailed property information
* Upload property images
* Categorize properties
* Display amenities such as WiFi, Parking, Pool, Gym, AC, and more

### 🖼️ Cloud Image Uploads

* Cloudinary integration for image storage
* Optimized cloud-hosted images
* Secure image management

### 🗺️ Interactive Maps

* Nominatim Geocoding API for location coordinates
* OpenStreetMap integration using Leaflet
* Interactive map display for property locations

### ⭐ Reviews & Ratings

* Add reviews and ratings
* Delete own reviews
* User-generated feedback system

### 🔍 Search & Filters

* Search listings by location or country
* Category-based filtering
* Amenity-based filtering
* Easy property discovery

### 🛡️ Authorization & Security

* Protected routes for authenticated users
* Listing ownership verification
* Review author authorization
* Server-side validation using Joi

### 📱 Responsive Design

* Mobile-friendly interface
* Bootstrap-powered layouts
* Optimized browsing experience across devices

---

## 🛠️ Tech Stack

| Category              | Technology                        |
| --------------------- | --------------------------------- |
| Runtime               | Node.js                           |
| Framework             | Express.js                        |
| Database              | MongoDB Atlas                     |
| ODM                   | Mongoose                          |
| Templating Engine     | EJS                               |
| Authentication        | Passport.js                       |
| Image Storage         | Cloudinary                        |
| Maps & Geocoding      | OpenStreetMap, Leaflet, Nominatim |
| Validation            | Joi                               |
| Styling               | Bootstrap 5, CSS                  |
| Session Storage       | connect-mongo                     |
| Environment Variables | dotenv                            |

---


## 📂 Project Structure

```text
WanderNest/
│
├── controllers/           # Application controllers
├── init/                  # Database initialization & seed data
├── models/                # Mongoose models
├── public/
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── images/            # Static images
│
├── routes/                # Express routes
├── utils/                 # Utility functions
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   │
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   ├── index.ejs
│   ├── show.ejs
│   ├── new.ejs
│   └── edit.ejs
│
├── middleware.js          # Custom middleware
├── joi.js                 # Joi validation schemas
├── cloudConfig.js         # Cloudinary configuration
├── app.js                 # Application entry point
├── package.json
└── .env
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/WanderNest.git
cd WanderNest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the Application

```bash
node app.js
```

or

```bash
npm start
```

Open your browser:

```text
http://localhost:8080
```

---

## 💡 Key Implementation Highlights

### MVC Architecture

The application follows the Model-View-Controller architecture, making the codebase organized, scalable, and easy to maintain.

### Secure Authentication

Passport.js is used to handle authentication and session management, ensuring secure user access.

### Cloud-Based Image Management

Property images are uploaded to Cloudinary and stored efficiently in the cloud.

### Location-Based Discovery

Nominatim Geocoding API converts addresses into coordinates, while Leaflet and OpenStreetMap provide interactive location visualization.

### Robust Validation

Joi validation ensures that invalid data never reaches the database.

### Error Handling

Custom error handling and middleware provide consistent and reliable application behavior.

---



## 🌐 Live Demo

**Live Website:** https://wandernest-project.onrender.com/listings

---

## 👩‍💻 Developer

**Palak Dhiman**

Computer Science Engineering Student
Aspiring AI/ML Engineer & Full-Stack Developer

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

**WanderNest — Explore. Discover. Stay.**
