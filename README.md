#  Property Management Backend API

## 🚀 Overview

This backend API manages property listings with full user authentication, search/filtering, caching, and property recommendations. It supports CRUD operations and optimizes performance with Redis caching.

---

## ✨ Features

- 🔐 User Registration & Login with email/password (JWT & bcrypt)
- 🏡 CRUD for properties (only creator can update/delete)
- 🔍 Property Search and filtering
- ⭐ Manage favorite properties with CRUD
- 📩 Recommend properties to other users by email
- ⚡ Redis caching
- 🌍 Deployed on https://hypergro-backend.vercel.app/

---

## 🛠 Tech Stack

- **Backend:** Node.js, TypeScript, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Cache:** Redis (Upstash)  
- **Authentication:** JWT  
- **Password Security:** bcryptjs  
- **Deployment:** Vercel

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js  
- MongoDB instance (local or cloud)  
- Redis instance (Upstash or local)  
- npm or yarn

# API Endpoints

Base URL: https://hypergro-backend.vercel.app/api

---

### User Routes (`/user`)

- post `/register` — Register a new user  
- post `/login` — Login user  
- get `/search-user` — Search user by email (requires authentication, query param: email)

---

### Property Routes (`/property`)

- post `/` — Create a new property (requires authentication)  
- get `/` — Get all properties  
- get `/:id` — Get property by ID  
- put `/:id` — Update property by ID (requires authentication)  
- delete `/:id` — Delete property by ID (requires authentication)

---

### Favorites Routes (`/fav`)

- post `/:propertyId` — Add property to favorites (requires authentication)  
- get `/` — Get all favorite properties (requires authentication)  
- delete `/:propertyId` — Remove property from favorites (requires authentication)

---

### Recommendation Routes (`/recommendation`)

- post `/recommend` — Recommend a property (requires authentication)  
- get `/` — Get recommendations received (requires authentication)



### Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
REDIS_URL=<your_redis_connection_url>

