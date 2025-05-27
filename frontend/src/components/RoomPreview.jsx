import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RoomPreview() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/rooms")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setRooms(data);
                } else {
                    console.error("Unexpected response:", data);
                    setRooms([]);
                }
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setRooms([]);
            });
    }, []);

    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12">
            <motion.div
                className="max-w-6xl mx-auto text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl font-semibold mb-4">Featured Rooms</h2>
                <p className="text-gray-600 text-lg">Discover your perfect stay — whether it's beachside luxury or jungle serenity.</p>
            </motion.div>

            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
                {rooms.map((room, index) => (
                    <motion.div
                        key={room.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <img src={room.image_url} alt={room.name} className="h-56 w-full object-cover" />
                        <div className="p-6 text-left">
                            <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                            <p className="text-gray-600 mb-4">{room.description}</p>
                            <span className="block font-medium text-black mb-4">${parseFloat(room.price_per_night).toFixed(2)}/night</span>
                            <Link
                                to="/rooms"
                                className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <Link to="/rooms" className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition">
                    View All Rooms
                </Link>
            </motion.div>
        </section>
    );
}
