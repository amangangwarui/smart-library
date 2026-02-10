# 📚 SMART LIBRARY – MERN Stack Project

A full-stack Library Management System built using MongoDB, Express, React, and Node.js (MERN Stack).

Users can:
- 📖 View books
- 📚 Borrow books
- 💳 Pay fines
- 🔄 Return books
- 📊 Track borrowed books in Dashboard

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- CORS

---

## 📁 Project Structure

```
SMART-LIBRARY
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   ├── api
│   └── .env.production
│
└── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/smart-library.git
cd smart-library
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm start
```

Backend runs at:
```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🌍 MongoDB Atlas Setup

1. Create cluster
2. Create database user
3. Allow IP access (0.0.0.0/0 for development)
4. Copy connection string
5. Paste into backend `.env` as `MONGO_URI`

---

## 🔐 Authentication

- JWT based authentication
- Token stored in localStorage
- Protected API routes use Bearer token

---

## 💳 Features

- User Signup & Login
- Borrow Books
- Auto Dashboard Update
- Payment System
- Return Book After Payment
- Book Availability Status
- Production Ready Setup

---

## 🚀 Deployment

### Backend → Render

Add Environment Variables:
```
PORT
MONGO_URI
JWT_SECRET
```

Start Command:
```
node server.js
```

---

### Frontend → Render / Vercel

Create `.env.production` in frontend:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Update `api.js`:

```js
baseURL: import.meta.env.VITE_API_URL
```

Build Command:
```
npm run build
```

Publish Folder:
```
dist
```

---

## 🛡️ .gitignore

```
node_modules
.env
.env.*
dist
```

---

## 👨‍💻 Author

Aman Gangwar  
MERN Stack Developer

---

⭐ If you like this project, give it a star on GitHub!
