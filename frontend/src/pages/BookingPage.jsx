import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const rooms = [
    {
        name: "Oceanfront Suite",
        image: "/images/room1.jpg",
        description: "Wake up to the soothing sound of waves and panoramic ocean views.",
        price: "$450/night/person",
        features: ["King bed", "Private balcony", "Jacuzzi", "Butler service"],
    },
    {
        name: "Garden Villa",
        image: "/images/room2.jpg",
        description: "Surrounded by lush tropical gardens, perfect for privacy and peace.",
        price: "$320/night/person",
        features: ["Queen bed", "Outdoor shower", "Terrace", "Mini bar"],
    },
    {
        name: "Hillside Bungalow",
        image: "/images/room3.jpg",
        description: "Secluded luxury for two — ideal for romance, with private plunge pool.",
        price: "$620/night/person",
        features: ["Canopy bed", "Infinity pool", "Ocean view", "Private chef"],
    },
];

export default function BookingPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    const openModal = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCheckIn("");
        setCheckOut("");
        setGuests(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Booking request submitted!");
        closeModal();
    };

    return (
        <main className="bg-white text-gray-800">
            <Navbar />

            {/* Hero */}
            <section
                className="w-full h-[50vh] bg-cover bg-center relative flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/booking-hero.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <motion.h1
                    className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-md"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Book Your Stay
                </motion.h1>
            </section>

            {/* Rooms */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-semibold text-center mb-12">Choose Your Room</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room, i) => (
                        <motion.div
                            key={i}
                            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <img src={room.image} alt={room.name} className="h-60 w-full object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">{room.description}</p>
                                <ul className="text-sm text-gray-500 mb-4 space-y-1">
                                    {room.features.map((f, j) => (
                                        <li key={j}>• {f}</li>
                                    ))}
                                </ul>
                                <p className="text-lg font-medium mb-4">{room.price}</p>
                                <button
                                    onClick={() => openModal(room)}
                                    className="mt-auto bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                                >
                                    Request Booking
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Booking Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                        <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-8 relative">
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                                <FaTimes />
                            </button>

                            <h3 className="text-2xl font-semibold mb-6">Complete Your Booking</h3>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="text" required placeholder="Full Name" className="border rounded-md p-3 w-full" />
                                    <input type="email" required placeholder="Email Address" className="border rounded-md p-3 w-full" />
                                    <input
                                        type="date"
                                        required
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className="border rounded-md p-3 w-full"
                                    />
                                    <input
                                        type="date"
                                        required
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="border rounded-md p-3 w-full"
                                    />
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        placeholder="Number of Guests"
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                        className="border rounded-md p-3 w-full"
                                    />
                                </div>

                                {/* Estimate */}
                                {checkIn && checkOut && guests > 0 && (
                                    <div className="mt-4">
                                        {(() => {
                                            const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
                                            const pricePerNight = selectedRoom
                                                ? parseInt(selectedRoom.price.replace(/[^0-9]/g, ""), 10)
                                                : 0;
                                            const total = pricePerNight * nights * guests;

                                            return (
                                                <p className="text-lg font-medium text-gray-800">
                                                    Estimated Total: ${total.toLocaleString()} ({guests} guest
                                                    {guests > 1 ? "s" : ""}, {nights} night
                                                    {nights > 1 ? "s" : ""})
                                                </p>
                                            );
                                        })()}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
                                >
                                    Submit Booking
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
