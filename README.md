# 🩸 Blood Donation Web Application

A full-stack blood donation platform that connects donors, volunteers, and admins to manage blood donation requests efficiently in real time.

---

## 🌐 Live Links

- 🔴 Live Website: https://blood-donation-web-2b177.web.app  
- 🟢 Server API: https://blood-donation-server-eight-mu.vercel.app  

---

## ✨ Features

### 👤 Role-Based System
- Admin, Donor, Volunteer authentication
- Secure login system with protected routes

### 🩸 Donor Features
- Create blood donation requests
- Update and track donation requests
- Search donors by blood group

### 🤝 Volunteer Features
- View assigned donation requests
- Update request status in real time

### 🛠️ Admin Features
- Manage users (block/unblock)
- Assign roles to users
- Monitor donation analytics

### 🌍 Public Features
- Searchable donor directory
- Real-time request updates
- Responsive UI with smooth animations

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- Framer Motion
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB

---

## ⚙️ How to Run This Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/xunaiet-faruk/Blood-donation-client.git


2. Go to project folder
cd Blood-donation-client
3. Install dependencies
npm install
4. Setup environment variables (Server Side)

Create a .env file inside the server folder:

USER_NAME=your_database_username
USER_PASSWORD=your_database_password
PORT=5000


5. Run frontend project
npm run dev

6. Run backend server
cd server

npm install
npm start