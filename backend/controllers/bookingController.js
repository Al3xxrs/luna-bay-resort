import db from "../db.js";
import { sendConfirmationEmail } from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
    try {
        const { fullName, email, phone, roomId, checkIn, checkOut, guests, totalPrice, roomName } = req.body;

        // Insert guest
        const [guestResult] = await db.query("INSERT INTO guests (name, email, phone) VALUES (?, ?, ?)", [fullName, email, phone]);

        const guestId = guestResult.insertId;

        // Insert booking
        await db.query(
            `INSERT INTO bookings 
             (guest_id, room_id, check_in, check_out, num_guests, total_price)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [guestId, roomId, checkIn, checkOut, guests, totalPrice]
        );

        await sendConfirmationEmail(email, fullName, {
            roomName, // ✅ use roomName from req.body
            checkIn,
            checkOut,
            guests,
            totalPrice,
        });

        res.status(201).json({ message: "Booking created successfully" });
    } catch (err) {
        console.error("Booking error:", err.message);
        res.status(500).json({ error: "Failed to create booking" });
    }
};
