import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const rooms = [
    {
        name: "Oceanfront Suite",
        image: "/images/room1.jpg",
        description: "Wake up to the soothing sound of waves and panoramic ocean views.",
        price: "$450/night",
        features: ["King bed", "Private balcony", "Jacuzzi", "Butler service"],
    },
    {
        name: "Garden Villa",
        image: "/images/room2.jpg",
        description: "Surrounded by lush tropical gardens, perfect for privacy and peace.",
        price: "$320/night",
        features: ["Queen bed", "Outdoor shower", "Terrace", "Mini bar"],
    },
    {
        name: "Hillside Bungalow",
        image: "/images/room3.jpg",
        description: "Secluded luxury for two — ideal for romance, with private plunge pool.",
        price: "$620/night",
        features: ["Canopy bed", "Infinity pool", "Ocean view", "Private chef"],
    },
];

export default function RoomsPage() {
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

                <div className="grid md:grid-cols-3 gap-10">
                    {rooms.map((room, i) => (
                        <motion.div
                            key={room.name}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                        >
                            <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                <p className="text-gray-600 mb-4">{room.description}</p>
                                <ul className="text-sm text-gray-500 mb-4 list-disc list-inside">
                                    {room.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                                <p className="font-semibold text-black mb-4">{room.price}</p>
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
            </section>

            <Footer />
        </main>
    );
}
