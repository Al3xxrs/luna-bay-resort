import db from "../db.js";
import path from "path";
import fs from "fs";

// GET
export const getAllRooms = async (req, res) => {
    try {
        const [rooms] = await db.query("SELECT * FROM rooms");

        const [features] = await db.query(`
      SELECT rf.room_id, f.name 
      FROM room_features rf 
      JOIN features f ON rf.feature_id = f.id
    `);

        const roomsWithFeatures = rooms.map((room) => ({
            ...room,
            features: features.filter((f) => f.room_id === room.id).map((f) => f.name),
        }));

        res.json(roomsWithFeatures);
    } catch (err) {
        console.error("Error fetching rooms:", err.message);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
};

// GET
export const getAllFeatures = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM features ORDER BY name ASC");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching features:", err.message);
        res.status(500).json({ error: "Failed to fetch features" });
    }
};

// POST
export const createRoom = async (req, res) => {
    const { name, description, price_per_night, features } = req.body;
    if (!name || !description || !price_per_night || !features) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const image_url = req.file ? `/uploads/images/rooms/${req.file.filename}` : null;

    let parsed;
    try {
        parsed = JSON.parse(features);
    } catch {
        return res.status(400).json({ error: "Invalid features format" });
    }

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const [result] = await conn.query("INSERT INTO rooms (name, description, price_per_night, image_url) VALUES (?, ?, ?, ?)", [
            name,
            description,
            price_per_night,
            image_url,
        ]);
        const roomId = result.insertId;

        const featureNames = Array.isArray(parsed) ? parsed : [];
        if (featureNames.length > 0) {
            const [rows] = await conn.query("SELECT id, name FROM features WHERE name IN (?)", [featureNames]);
            const map = new Map(rows.map((f) => [f.name, f.id]));
            const inserts = featureNames
                .map((name) => map.get(name))
                .filter(Boolean)
                .map((fid) => [roomId, fid]);

            if (inserts.length > 0) {
                await conn.query("INSERT INTO room_features (room_id, feature_id) VALUES ?", [inserts]);
            }
        }

        await conn.commit();
        res.status(201).json({ message: "Room created successfully", roomId });
    } catch (err) {
        await conn.rollback();
        console.error("Error creating room:", err);
        res.status(500).json({ error: "Failed to create room" });
    } finally {
        conn.release();
    }
};

// PUT
export const updateRoom = async (req, res) => {
    const { id, name, description, price_per_night, features } = req.body;
    const image_url = req.file ? `/uploads/images/rooms/${req.file.filename}` : null;

    if (!id) {
        return res.status(400).json({ error: "Room ID is required" });
    }

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // Clean up old image if a new one was uploaded
        if (image_url) {
            const [[oldRoom]] = await conn.query("SELECT image_url FROM rooms WHERE id = ?", [id]);
            if (oldRoom?.image_url) {
                const oldImagePath = path.resolve("uploads", oldRoom.image_url.replace("/uploads/", ""));
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.warn("Failed to delete old image:", err.message);
                });
            }
        }

        // Build and run update query
        const updateSql = image_url
            ? "UPDATE rooms SET name = ?, description = ?, price_per_night = ?, image_url = ? WHERE id = ?"
            : "UPDATE rooms SET name = ?, description = ?, price_per_night = ? WHERE id = ?";
        const updateParams = image_url ? [name, description, price_per_night, image_url, id] : [name, description, price_per_night, id];

        await conn.query(updateSql, updateParams);

        // Replace room_features
        await conn.query("DELETE FROM room_features WHERE room_id = ?", [id]);

        let parsed;
        try {
            parsed = JSON.parse(features);
        } catch (err) {
            throw new Error("Invalid JSON in 'features'");
        }

        if (Array.isArray(parsed) && parsed.length > 0) {
            const [rows] = await conn.query("SELECT id, name FROM features WHERE name IN (?)", [parsed]);
            const featureMap = new Map(rows.map((f) => [f.name, f.id]));

            const inserts = parsed
                .map((name) => featureMap.get(name))
                .filter(Boolean)
                .map((fid) => [id, fid]);

            if (inserts.length > 0) {
                await conn.query("INSERT INTO room_features (room_id, feature_id) VALUES ?", [inserts]);
            }
        }

        await conn.commit();
        res.json({ success: true });
    } catch (err) {
        await conn.rollback();
        console.error("Error updating room:", err);
        res.status(500).json({ error: err.message || "Failed to update room" });
    } finally {
        conn.release();
    }
};

// DELETE
export const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM rooms WHERE id = ?", [id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Error deleting room:", err.message);
        res.status(500).json({ error: "Failed to delete room" });
    }
};
