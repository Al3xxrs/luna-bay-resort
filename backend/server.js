import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Import routes
import adminRoutes from "./routes/admin.js";
import roomsRoutes from "./routes/rooms.js";
import bookingsRoutes from "./routes/bookings.js";
import contactRoutes from "./routes/contact.js";

// Load environment variables
dotenv.config();

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();

// Middleware
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/contact", contactRoutes);

// Static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server listen
const PORT = process.env.PORT || 18473;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
