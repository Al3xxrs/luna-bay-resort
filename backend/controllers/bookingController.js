import db from "../db.js";
import { sendConfirmationEmail } from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
    try {
        const { fullName, email, phone, roomId, checkIn, checkOut, guests, totalPrice } = req.body;

        if (!fullName || !email || !roomId || !checkIn || !checkOut || !guests || !totalPrice) {
            return res.status(400).json({ error: "Missing required booking fields." });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        if (isNaN(checkInDate) || isNaN(checkOutDate) || checkOutDate <= checkInDate) {
            return res.status(400).json({ error: "Invalid check-in/check-out dates." });
        }

        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // Confirm room exists
            const [[room]] = await conn.query("SELECT name FROM rooms WHERE id = ?", [roomId]);
            if (!room) {
                return res.status(400).json({ error: "Selected room does not exist." });
            }

            // Prevent double booking
            const [conflicts] = await conn.query(
                `SELECT 1 FROM bookings 
                 WHERE room_id = ? AND check_in < ? AND check_out > ?`,
                [roomId, checkOutDate, checkInDate]
            );
            if (conflicts.length > 0) {
                return res.status(409).json({ error: "Room is already booked for those dates." });
            }

            // Ensure guest record
            const [existingGuests] = await conn.query("SELECT id FROM guests WHERE email = ?", [email]);
            let guestId;
            if (existingGuests.length > 0) {
                guestId = existingGuests[0].id;
            } else {
                const [guestResult] = await conn.query("INSERT INTO guests (full_name, email, phone) VALUES (?, ?, ?)", [
                    fullName,
                    email,
                    phone,
                ]);
                guestId = guestResult.insertId;
            }

            // Create booking
            await conn.query(
                `INSERT INTO bookings (guest_id, room_id, check_in, check_out, num_guests, total_price)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [guestId, roomId, checkInDate, checkOutDate, guests, totalPrice]
            );

            await conn.commit();

            try {
                await sendConfirmationEmail(email, fullName, {
                    roomName: room.name,
                    checkIn: checkInDate.toISOString().split("T")[0],
                    checkOut: checkOutDate.toISOString().split("T")[0],
                    guests,
                    totalPrice,
                });
            } catch (emailErr) {
                console.warn("Email send failed, but booking succeeded:", emailErr.message);
            }

            res.status(201).json({ message: "Booking created successfully" });
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error("Booking error:", err.message || err);
        res.status(500).json({ error: "Failed to create booking" });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM bookings`);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching bookings:", err.message);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

export const getDashboardBookings = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
              guest_id,
              room_id,
              DATE_FORMAT(check_in, '%Y-%m-%d') AS checkIn,
              DATE_FORMAT(check_out, '%Y-%m-%d') AS checkOut,
              num_guests AS guests,
              total_price AS totalPrice,
              g.full_name AS fullName,
              g.email,
              r.name AS roomName
            FROM bookings b
            JOIN guests g ON b.guest_id = g.id
            JOIN rooms r ON b.room_id = r.id
            ORDER BY b.created_at DESC
          `);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching dashboard bookings:", err.message);
        res.status(500).json({ error: "Failed to fetch dashboard bookings" });
    }
};

export const updateBookingByCompositeKey = async (req, res) => {
    const { guest_id, room_id, originalCheckIn, checkIn, checkOut, num_guests } = req.body;

    const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split("T")[0];
    };

    const formattedOriginalCheckIn = formatDate(originalCheckIn);
    const formattedCheckIn = formatDate(checkIn);
    const formattedCheckOut = formatDate(checkOut);

    try {
        const [result] = await db.query(
            `UPDATE bookings
             SET check_in = ?, check_out = ?, num_guests = ?
             WHERE guest_id = ? AND room_id = ? AND check_in = ?`,
            [formattedCheckIn, formattedCheckOut, num_guests, guest_id, room_id, formattedOriginalCheckIn]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.json({ success: true, message: "Booking updated." });
    } catch (err) {
        console.error("Error updating booking:", err);
        res.status(500).json({ error: "Update failed" });
    }
};

export const deleteBookingByCompositeKey = async (req, res) => {
    const { guest_id, room_id, checkIn } = req.body;

    try {
        await db.query(`DELETE FROM bookings WHERE guest_id = ? AND room_id = ? AND check_in = ?`, [guest_id, room_id, checkIn]);

        res.json({ success: true, message: "Booking deleted." });
    } catch (err) {
        console.error("Error deleting booking:", err);
        res.status(500).json({ error: "Delete failed" });
    }
};

export const checkRoomAvailability = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut } = req.query;

        const [existingBookings] = await db.query(
            `SELECT * FROM bookings 
             WHERE room_id = ? 
             AND check_in < ? 
             AND check_out > ?`,
            [roomId, checkOut, checkIn]
        );

        const isAvailable = existingBookings.length === 0;

        res.json({ available: isAvailable });
    } catch (err) {
        console.error("Availability check error:", err.message);
        res.status(500).json({ error: "Failed to check availability" });
    }
};
