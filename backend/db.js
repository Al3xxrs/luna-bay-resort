import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Create a connection pool to handle concurrent connections efficiently
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0, // 0 = unlimited queued requests
    timezone: "Z", // UTC timezone to prevent datetime issues
});

export default pool;
