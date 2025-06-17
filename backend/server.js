import express from "express";
import cors from "cors";
import roomsRouter from "./routes/rooms.js";
import bookingRoutes from "./routes/bookings.js";
import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contact.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

// Static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server listen
const PORT = process.env.PORT || 18473;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
