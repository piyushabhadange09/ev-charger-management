<<<<<<< HEAD
🚀 EV Charger Management System
A full-stack web application to manage EV charger stations. It includes:

🔐 User authentication (Login/Register)

🧾 CRUD operations for charger stations

📍 Interactive map view using Leaflet + OpenStreetMap

🎯 Filters for status, power output, connector type

📦 Frontend built with Vue.js, backend with Node.js + Express + MongoDB

📁 Folder Structure
/frontend → Vue 3 SPA (Vue Router, Axios)
/backend → Express API + MongoDB models

⚙️ Tech Stack
Layer Tech
Frontend-->Vue 3, Axios, Vue Router
Backend-->Node.js, Express, MongoDB
Map -->Leaflet + OpenStreetMap
Auth-->JWT + bcrypt

🔧 Installation & Setup

1. Clone the repository
   git clone https://github.com/piyushabhadange09/ev-charger-management
   cd ev-charger-management

2. Backend Setup
   cd backend
   npm install

   Create a .env file with:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/evdb
   JWT_SECRET=your_jwt_secret

   Then start the backend:
   node server.js

3. Frontend Setup
   cd frontend
   npm install
   npm run dev

   Visit: http://localhost:5173

✨ Features
✅ User Login & Register (JWT-secured)

✅ Add/Edit/Delete chargers

✅ View chargers in a table with filters

✅ View chargers on an interactive map

✅ Sort by power output

✅ Export to CSV (optional)

✅ Responsive design with modern UI

🧪 Sample Credentials
You can register your own account or use:
Email: demo@example.com
Password: demo123

🌍 Map View
Uses Leaflet.js and OpenStreetMap

Displays all onboarded chargers as markers

Click on a marker to view detailed charger info
