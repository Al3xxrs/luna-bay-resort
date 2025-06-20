import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

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
app.use("/api/admin", require("./routes/admin"));
app.use("/api/rooms", require("./routes/rooms"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/contact", require("./routes/contact"));

// Static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server listen
const PORT = process.env.PORT || 18473;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
