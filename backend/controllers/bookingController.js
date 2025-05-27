import db from "../db.js";

export const createBooking = async (req, res) => {
    const { room_id, guest_name, guest_email, check_in, check_out, num_guests, special_requests } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO bookings (room_id, guest_name, guest_email, check_in, check_out, num_guests, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [room_id, guest_name, guest_email, check_in, check_out, num_guests, special_requests]
        );
        res.status(201).json({ id: result.insertId, message: "Booking created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create booking" });
    }
};
