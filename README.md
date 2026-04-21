# 🩸 Blood Donation Web Application

A full-stack **Blood Donation Platform** that connects donors, volunteers, and admins to efficiently manage blood donation requests in real time.

---

## 🌐 Live Links

* 🔴 **Live Website:** https://blood-donation-web-2b177.web.app
* 🟢 **Server API:** https://blood-donation-server-eight-mu.vercel.app

---

## 📌 Overview

This platform enables seamless coordination between **Donors**, **Volunteers**, and **Admins**:

* Donors can create and manage blood donation requests
* Volunteers handle and update request statuses
* Admins manage users and monitor overall system activity

---

## ✨ Features

### 👤 Role-Based System

* Three user roles: **Admin, Donor, Volunteer**
* Secure authentication using Firebase
* Protected routes based on user roles

---

### 🩸 Donor Features

* Create blood donation requests
* Update and track request status
* Search donors by blood group

---

### 🤝 Volunteer Features

* View assigned donation requests
* Update request status in real time

---

### 🛠️ Admin Features

* Manage users (block/unblock)
* Assign roles to users
* Monitor donation activities

---

### 🌍 Public Features

* Searchable donor directory
* Real-time updates
* Fully responsive UI with smooth animations

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* Framer Motion
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB

---

## 📦 Run Locally

### 🔹 Frontend Setup

#### 1️⃣ Clone client repository

```bash id="7r1c9y"
git clone https://github.com/xunaiet-faruk/Blood-donation-client
cd Blood-donation-client
```

#### 2️⃣ Install dependencies

```bash id="3m1l8g"
npm install
```

#### 3️⃣ Run frontend

```bash id="d8pwk2"
npm run dev
```

Frontend will run on:

```id="6ov1hx"
http://localhost:5173
```

---

### 🔹 Backend Setup

#### 1️⃣ Clone server repository

```bash id="l6q9tt"
git clone https://github.com/xunaiet-faruk/Blood-donation-server
cd Blood-donation-server
```

#### 2️⃣ Install dependencies

```bash id="3wq7sz"
npm install
```

#### 3️⃣ Setup environment variables

Create a `.env` file in the root directory:

```env id="q5v0ox"
PORT=5000
USER_NAME=your_database_username
USER_PASSWORD=your_database_password
```

#### 4️⃣ Run backend server

```bash id="v7o4h3"
npm start
```

Backend will run on:

```id="9t8z2r"
http://localhost:5000
```

---

## 🔗 API Connection (Example)

```js id="r5x2mk"
import axios from 'axios';
import { useMemo } from 'react';

const useAxios = () => {
    const axiosInstance = useMemo(() => {
        return axios.create({
            // Local server
            // baseURL: 'http://localhost:5000'

            // Production server
            baseURL: 'https://blood-donation-server-eight-mu.vercel.app'
        });
    }, []);

    return axiosInstance;
};

export default useAxios;
```

---

## ⚠️ Important Notes

* Always run the backend server before starting the frontend
* Ensure MongoDB credentials are correctly configured
* Keep your `.env` file secure and never commit it to version control
* Update API baseURL when switching between local and production environments

---

## 🚀 Future Improvements

* Notification system
* Advanced filtering options
* Blood request priority system

---

## 👨‍💻 Author

**Junaiet Faruk**

---
