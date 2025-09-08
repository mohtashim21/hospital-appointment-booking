# Hospital Appointment Booking App

A full-stack web application for hospital appointment booking, built with React and tailwind css (client) and Node.js + Express + MongoDB (server).  
Users can book appointments online, and hospital admins can manage them via the admin panel.


## Features
### User Side
- View hospital details, reviews, and testimonials.
- Book appointments with details like patient name, email/phone, treatment, date, time slot, gender, and age.
- Receive booking confirmation (simulated notification).

### Admin Side
- View all appointments in a sortable and filterable table.
- Update appointment status (`Pending`, `Confirmed`, `Completed`).
- Dashboard with summary statistics:
  - Total Appointments
  - Appointments Today
  - Upcoming Appointments



## Tech Stack
- Frontend (client): React, TailwindCSS, React Router, Axios  
- Backend (server): Node.js, Express.js, MongoDB, Mongoose  
- Other Tools: React Hook Form, FontAwesome Icons  


##  Setup Instructions

### 1. Clone Repository

git clone https://github.com/mohtashim21/hospital-appointment-booking
cd hospital-appointment-booking

2. Install Dependencies
Client (React)

cd client
npm install

cd ../server
npm install

3. Configure Environment Variables

Create a .env file inside the server folder:
PORT=8000
MONGO_URI=mongodb://localhost:27017/hospital-management

Create a .env file inside the client folder:
API_URL=http://localhost:8000/api

4. Run the App
Start Backend (server)

cd server
npm run dev

Start Frontend (client)
cd client
npm run dev
