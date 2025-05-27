import db from "../db.js";

export const getAllRooms = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM rooms");
        console.log("Fetched rooms:", rows);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching rooms:", err.message);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
};
