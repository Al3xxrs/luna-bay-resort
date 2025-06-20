import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { getAllRooms, getAllFeatures, deleteRoom, createRoom, updateRoom } from "../controllers/roomController.js";
import { getDashboardBookings, updateBookingByCompositeKey, deleteBookingByCompositeKey } from "../controllers/bookingController.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const { EMAIL_USER, JWT_SECRET } = process.env;
const CODE_EXPIRY_MS = 5 * 60 * 1000;

const codeStore = new Map();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.resolve("uploads/images/rooms");
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

router.put("/bookings", verifyAdmin, updateBookingByCompositeKey);
router.delete("/bookings", verifyAdmin, deleteBookingByCompositeKey);
router.get("/rooms", verifyAdmin, getAllRooms);
router.post("/rooms", verifyAdmin, upload.single("image"), createRoom);
router.put("/rooms", verifyAdmin, upload.single("image"), updateRoom);
router.delete("/rooms/:id", verifyAdmin, deleteRoom);
router.get("/rooms/features", verifyAdmin, getAllFeatures);
router.get("/bookings", verifyAdmin, getDashboardBookings);

router.post("/request-code", async (req, res) => {
    const { email } = req.body;
    if (email !== EMAIL_USER) {
        return res.status(401).json({ success: false, message: "Unauthorized email" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + CODE_EXPIRY_MS;
    codeStore.set(email, { code, expiresAt });

    try {
        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: "Your Admin Login Code",
            text: `Your verification code is: ${code}`,
        });

        res.json({ success: true });
    } catch (err) {
        console.error("Failed to send email:", err);
        res.status(500).json({ success: false, message: "Error sending code" });
    }
});

router.post("/verify-code", (req, res) => {
    const { email, code } = req.body;

    const record = codeStore.get(email);
    if (!record || record.code !== code || Date.now() > record.expiresAt) {
        return res.status(401).json({ success: false, message: "Invalid or expired code" });
    }

    codeStore.delete(email);

    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ success: true, token });
});

export default router;
