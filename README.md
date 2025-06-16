# 🌙 Luna Bay Resort – Hotel Booking Web App

**Luna Bay Resort** is a full-stack hotel booking platform built with a modern web stack. Users can explore rooms, view amenities, and book stays. Admins have access to a secure dashboard to manage room data and bookings.

---

## 🗂️ Structure

```markdown
luna-bay-resort/
├── backend/ # Express.js server, REST API, MySQL database connection
│ ├── controllers/
│ ├── middleware/
│ ├── routes/
| ├── utils/
│ ├── .env .example
│ ├── db.js
│ └── server.js
│
├── frontend/ # React + Vite app, Tailwind CSS
│ ├── public/
│ ├── src/
│ ├── index.html
│ ├── eslint.config.js
│ └── vite.config.js
│
├── database/ # E-R diagram, DB Schema, diagram screenshot
│ ├── luna-bay-resort.drawio
│ ├── luna-bay-resort.sql
│ ├── luna-bay-resort.png
├── README.md
└── .gitignore
```

---

## ✨ Features

### 👥 User Functionality

-   Browse rooms with pricing, features, and images
-   Real-time filtering (Wi-Fi, AC, Pool, etc.)
-   Booking form with date + guest selection
-   Mobile-first responsive UI

### 🔐 Admin Dashboard

-   Admin login using one-time email code
-   CRUD for:
    -   Rooms (with image uploads)
    -   Features (room amenities)
    -   Bookings (update/delete)
-   Dashboard metrics (e.g., upcoming check-ins)

---

## ⚙️ Tech Stack

| Layer    | Technologies                                |
| -------- | ------------------------------------------- |
| Frontend | React, Vite, Tailwind CSS, React Router     |
| Backend  | Node.js, Express, Multer, JWT, Nodemailer   |
| Database | MySQL                                       |
| Hosting  | Vercel (Frontend), Railway/Render (Backend) |

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
SOURCE schema.sql;
```

### 3. Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=luna_bay_resort

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=yourapppassword
JWT_SECRET=yourjwtsecret
```

---

### 4. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 5. Run the App

```bash
# Start backend server
cd backend
npm run dev

# In a new terminal, start frontend dev server
cd ../frontend
npm run dev
```

---

## 🌐 Deployment

-   **Frontend:** Vercel (auto-deploys from `/frontend`)
-   **Backend:** Railway / Render
-   Ensure the frontend `vite.config.js` proxies API to the backend URL in production.

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
