import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";

export default function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRooms() {
            try {
                const res = await axios.get("http://localhost:5000/api/rooms");
                setRooms(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load rooms.");
                setLoading(false);
            }
        }
        fetchRooms();
    }, []);

    const getVariantImage = (roomName) => {
        switch (roomName) {
            case "Oceanfront Suite":
                return "/images/room1.jpg";
            case "Garden Villa":
                return "/images/room2.jpg";
            case "Hillside Bungalow":
                return "/images/room3.jpg";
            default:
                return "/images/default.jpg";
        }
    };

    return (
        <main className="bg-white text-gray-800">
            <Navbar />

            {/* Hero Section */}
            <section
                className="h-[60vh] bg-cover bg-center relative flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/rooms-hero.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <motion.h1
                    className="relative z-10 text-5xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Our Rooms
                </motion.h1>
            </section>

            {/* Rooms Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <motion.h2
                    className="text-3xl font-semibold text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Choose Your Perfect Stay
                </motion.h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading rooms...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-10">
                        {rooms.map((room, i) => (
                            <motion.div
                                key={room.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                            >
                                <img
                                    src={getVariantImage(room.name)}
                                    alt={room.name}
                                    className="w-full h-64 object-cover rounded-t-2xl transition-transform duration-500 hover:scale-105"
                                />

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                    <p className="text-gray-600 mb-4">{room.description}</p>
                                    <ul className="text-sm text-gray-500 mb-4 list-disc list-inside">
                                        {/* Optional: Add real features if available */}
                                        <li>Comfortable bed</li>
                                        <li>High-speed Wi-Fi</li>
                                        <li>Ocean/Garden/Hillside view</li>
                                    </ul>
                                    <p className="font-semibold text-black mb-4">${parseFloat(room.price_per_night).toFixed(2)}/night</p>
                                    <a
                                        href="/booking"
                                        className="inline-block px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition text-sm"
                                    >
                                        Book Now
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
