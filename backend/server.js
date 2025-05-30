import express from "express";
import cors from "cors";
import roomsRouter from "./routes/rooms.js";
import bookingRoutes from "./routes/bookings.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
