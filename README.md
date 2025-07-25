# 🌙 Luna Bay Resort – Hotel Booking Web App

**Luna Bay Resort** is a full-stack hotel booking platform built with a modern web stack. Users can explore rooms, view amenities, and book stays. Admins have access to a secure dashboard to manage room data and bookings.

---

## 🗂️ Structure

```bash
luna-bay-resort/
├── backend/ # Express.js server, REST API, MySQL database connection
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── db.js
│   └── server.js
│
├── frontend/ # React + Vite app, Tailwind CSS
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── eslint.config.js
│   └── vite.config.js
│
├── database/ # E-R diagram, DB Schema, diagram screenshot
│   ├── luna-bay-resort.drawio
│   ├── luna-bay-resort.sql
│   ├── luna-bay-resort.png
├── README.md
└── .gitignore
```

---

## ✨ Features

### 👥 User Features

-   🏨 Browse rooms with images, features, and prices
-   🔍 Filter by amenities (Wi-Fi, AC, Pool, etc.)
-   📅 Book rooms with guest and date selection
-   📱 Mobile-first responsive design

### 🔐 Admin Dashboard

-   🔐 Login via one-time email code (OTP) sent to admin email (no passwords)
-   🔐 Admin routes protected by JWT tokens with “admin” role, valid for 2 hours
-   🛏️ Manage rooms: add, edit, delete, with image upload support
-   🧰 Manage room features (amenities)
-   📘 View, update, or delete bookings (using composite key: guest_id + room_id + check_in)
-   📊 Dashboard metrics for bookings and upcoming check-ins

---

## ⚙️ Tech Stack

| Layer    | Technologies                              |
| -------- | ----------------------------------------- |
| Frontend | React, Vite, Tailwind CSS                 |
| Backend  | Node.js, Express, JWT, Nodemailer, Multer |
| Database | MySQL                                     |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/luna-bay-resort.git
cd luna-bay-resort
```

### 2. Database Setup

```sql
-- Run this in your MySQL client
SOURCE luna-bay-resort.sql;
```

### 3. Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourapppassword
DB_NAME=luna_bay_resort

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=yourapppassword
JWT_SECRET=yourjwtsecret
```

**Note:**

-   The `JWT_SECRET`, email credentials, and DB credentials are critical for app security and must be kept private.
-   The email account needs to allow SMTP access (for Gmail, consider using app passwords or enabling less secure app access).

### 4. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 5. Run the App

```bash
# Start backend server
cd backend
npm start

# In a new terminal, start frontend dev server
cd ../frontend
npm run dev
```

---

## 🔐 Authentication Flow (Admin)

-   Admin logs in by requesting a one-time code via email (POST `/api/admin/request-code`)
-   The code is valid for 5 minutes
-   Admin verifies the code (POST `/api/admin/verify-code`) to receive a JWT token
-   JWT tokens contain `role: "admin"` claim and expire after 2 hours
-   Admin-only routes are protected by middleware verifying JWT tokens and role

---

## 📂 File Uploads

-   Admin can upload room images via the admin dashboard
-   Images are stored in `backend/uploads/images/rooms`
-   Backend must have write permissions to this folder
-   Uploaded images are served statically via `/uploads` route

---

## 📝 Booking Composite Key

-   Bookings are uniquely identified by a composite key: `guest_id`, `room_id`, and `check_in` date
-   This key is used for updating and deleting bookings to ensure correct records

---

## 💡 Development Tips

-   Use Postman or similar tools to test API endpoints, especially admin-protected routes
-   To test admin login:

    1. POST your admin email to `/api/admin/request-code`
    2. Check your email for the code
    3. POST email + code to `/api/admin/verify-code` to receive a JWT token
    4. Use the JWT token in `Authorization: Bearer <token>` header for protected routes

-   Uploaded images accumulate on the server filesystem — consider periodic cleanup in production

---

## 📚 Database Schema

Located in [`luna-bay-resort.sql`](database/luna-bay-resort.sql)

Includes:

-   Guests
-   Rooms
-   Features
-   Room-Features (many-to-many)
-   Bookings (with composite key: guest_id + room_id + check_in)

---

## 🙋 Author

-   GitHub: [Al3xxrs](https://github.com/Al3xxrs)
-   Project: **Luna Bay Resort**

---

## 📄 License

```
This project is open-source and free to use under the MIT License.
```
