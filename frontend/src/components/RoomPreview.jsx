import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// Destructure motion elements to avoid ESLint "unused variable" warnings
const { div: MotionDiv, img: MotionImg } = motion;

export default function RoomPreview() {
    const [rooms, setRooms] = useState([]);

    // Fetch room data from API on mount
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/rooms`);
                setRooms(data);
            } catch (err) {
                console.error("Failed to load rooms:", err);
            }
        };

        fetchRooms();
    }, []);

    // Animation variants
    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay },
    });

    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12">
            {/* Section Heading */}
            <MotionDiv className="max-w-6xl mx-auto text-center mb-12" {...fadeUp(0)} transition={{ duration: 0.6 }}>
                <h2 className="text-4xl font-semibold mb-4">Featured Rooms</h2>
                <p className="text-gray-600 text-lg">Discover your perfect stay — whether it's beachside luxury or jungle serenity.</p>
            </MotionDiv>

            {/* Room Cards */}
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
                {rooms.slice(0, 3).map((room, index) => (
                    <MotionDiv key={room.id} className="bg-white rounded-2xl shadow-lg overflow-hidden" {...fadeUp(index * 0.2)}>
                        <MotionImg src={room.image_url} alt={room.name} className="h-56 w-full object-cover" />
                        <div className="p-6 text-left">
                            <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                            <p className="text-gray-600 mb-4">{room.description}</p>
                            <span className="block font-medium text-black mb-4">
                                ${parseFloat(room.price_per_night).toFixed(2)}/night/person
                            </span>
                            <Link
                                to="/booking"
                                className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </MotionDiv>
                ))}
            </div>

            {/* CTA Button */}
            <MotionDiv className="text-center mt-12" {...fadeUp(0.5)}>
                <Link
                    to="/booking"
                    className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition"
                >
                    View All Rooms
                </Link>
            </MotionDiv>
        </section>
    );
}
