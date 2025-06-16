import express from "express";
import { createBooking, checkRoomAvailability } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/availability", checkRoomAvailability);
export default router;
