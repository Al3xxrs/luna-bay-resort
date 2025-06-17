import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const caCert = fs.readFileSync(path.resolve(__dirname, "../ca.pem"));

// Create a connection pool to handle concurrent connections efficiently
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.PORT), // ✅ add this line
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: caCert,
        rejectUnauthorized: true,
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
