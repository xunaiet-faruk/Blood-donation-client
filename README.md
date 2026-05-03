# 🩸 Blood Donation Web Application

A comprehensive Blood Donation Platform designed to connect donors, volunteers, and admins to manage life-saving blood requests in real-time.

---

## 🌐 Live Links

| Platform | URL |
|----------|-----|
| **Live Website** | [https://blood-donation-web-2b177.web.app](https://blood-donation-web-2b177.web.app) |
| **Server API** | [https://blood-donation-server-eight-mu.vercel.app](https://blood-donation-server-eight-mu.vercel.app) |

---

## 📌 Project Overview

This platform bridges the gap between those in need and those willing to help. It features a robust **Role-Based Access Control (RBAC)** system ensuring that Admins, Volunteers, and Donors have tailored interfaces to manage requests, users, and content.

---

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | xunaiet28@gmail.com | 123456 |
| **Volunteer** | mayajahed67@gmail.com | 1234567 |
| **Donor** | j23ietf@gmail.com | fdasfdasf |

---

## ✨ Key Features

### 👑 Admin Dashboard

| Feature | Description |
|---------|-------------|
| **Analytics** | Visual charts for donor statistics and request status |
| **User Management** | Ability to block/unblock users, delete accounts, or change roles |
| **Request Oversight** | Full control over blood requests (assigning volunteers, changing status) |
| **Content Management** | Full-featured blog/content creation and deletion |

### 🤝 Volunteer Dashboard

| Feature | Description |
|---------|-------------|
| **Assignment Tracking** | View requests specifically assigned by the Admin |
| **Status Management** | Update request status to In-progress, Done, or Canceled |
| **Data Access** | Detailed view of requester information for coordination |

### 🩸 Donor Dashboard

| Feature | Description |
|---------|-------------|
| **Request Creation** | Simple form to post urgent blood needs |
| **Personal Tracking** | Manage and monitor the status of personal requests |
| **Profile Control** | Keep contact information and blood group data up to date |

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React.js (Vite), Tailwind CSS, Framer Motion, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth/Security** | Firebase Authentication, JSON Web Tokens (JWT) |
| **UI Components** | SweetAlert2, React Router DOM |

---

## 🚀 Local Setup Guide

### 1️⃣ Frontend Setup

**Clone the Repository:**

```bash
git clone https://github.com/xunaiet-faruk/Blood-donation-client
cd Blood-donation-client
npm install


Configure API Instance:

Navigate to your Axios configuration file (e.g., src/hooks/Useaxios.jsx) and ensure the baseURL points to your local server:

# import axios from 'axios';
# import React, { useMemo } from 'react';

# const Useaxios = () => {
#     const axiosInstance =useMemo(()=>{
#         return axios.create({
#             baseURL: 'http://localhost:5000'
#             // baseURL: 'https://blood-donation-server-eight-mu.vercel.app'
          
#         })
#     },[])
#     return axiosInstance;
# };

# export default Useaxios;

Run the App:

bash
npm run dev
Frontend will run on: http://localhost:5173

2️⃣ Backend Setup
Clone the Repository:

bash
git clone https://github.com/xunaiet-faruk/Blood-donation-server
cd Blood-donation-server
npm install
Environment Variables:

Create a .env file in the root directory and add your MongoDB credentials:

env
USER_NAME=your_mongodb_username
USER_PASSWORD=your_mongodb_password
PORT=5000
Run the Server:

bash
npm start
For development with auto-reload:

bash
npm run dev
Backend will run on: http://localhost:5000

📋 Database Structure
Collection	Purpose
users	User profiles, roles (Admin/Volunteer/Donor), and status (Active/Blocked)
blood-requests	Details regarding the recipient, location, date, and current status
contents	Blog posts and informative articles
volunteer-assignments	Mapping of specific requests to volunteers
🔗 API Endpoints Overview
Method	Endpoint	Description	Access
GET	/register/:email	Get user by email	All
POST	/register	Create new user	Public
GET	/users	Get all users	Admin
PUT	/users/:id	Update user role/status	Admin
GET	/blood-request	Get all requests	Admin/Volunteer
POST	/blood-request	Create new request	Donor
PUT	/blood-request/:id	Update request	Admin/Donor
DELETE	/blood-request/:id	Delete request	Admin/Donor
PUT	/blood-request/:id/assign	Assign volunteer	Admin
GET	/contents	Get all content	Public
POST	/contents	Create new content	Admin
DELETE	/contents/:id	Delete content	Admin
🎨 UI Features
Smooth Animations - Framer Motion for engaging transitions

Responsive Design - Works perfectly on all devices

Mobile-First Approach - Optimized for mobile experience

Beautiful Alerts - SweetAlert2 for user notifications

Loading States - Professional loading indicators

Error Handling - Graceful error messages

🔒 Security Features

Role-Based Access - Protected routes based on user roles

Firebase Auth - Secure authentication system

Environment Variables - Secure configuration management

Block/Unblock System - Blocked users cannot create requests

🐛 Common Issues & Solutions
Issue: Volunteer redirects to home page
Solution:

Ensure user role is properly fetched from database

Check if volunteer email matches assigned requests

Clear localStorage and re-login

Verify API connection is working

Issue: API call fails with CORS error
Solution:

Check backend CORS configuration

Ensure backend server is running

Verify API baseURL is correct

🚀 Future Improvements
Real-time notification system using Socket.io

Email notifications for request updates

Advanced donor filtering options

Blood request priority system (urgent/normal)

Mobile application (React Native)

SMS alerts for urgent requests

Donor rating system

Blood camp management feature

Location-based donor matching using Google Maps



👨‍💻 Author
Junaiet Faruk (Xunaiet Faruk)

🌐 GitHub: @xunaiet-faruk

📧 Email: xunaiet28@gmail.com

🙏 Acknowledgments
Firebase for authentication

MongoDB for database

Vercel for server hosting

Firebase Hosting for client hosting

All contributors and testers

