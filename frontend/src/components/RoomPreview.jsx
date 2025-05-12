import React from "react";
import { Link } from "react-router-dom";

const rooms = [
    {
        name: "Oceanfront Suite",
        description: "Wake up to endless blue with private balcony views.",
        price: "$350/night",
        image: "/images/room-ocean.jpg",
    },
    {
        name: "Garden Villa",
        description: "Surrounded by lush palms and serene privacy.",
        price: "$280/night",
        image: "/images/room-garden.jpg",
    },
    {
        name: "Hillside Bungalow",
        description: "Charming and elevated, perfect for a quiet escape.",
        price: "$220/night",
        image: "/images/room-hillside.jpg",
    },
];

export default function RoomPreview() {
    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Featured Rooms</h2>
                <p className="text-gray-600 text-lg">Discover your perfect stay — whether it's beachside luxury or jungle serenity.</p>
            </div>

            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
                {rooms.map((room, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <img src={room.image} alt={room.name} className="h-56 w-full object-cover" />
                        <div className="p-6 text-left">
                            <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                            <p className="text-gray-600 mb-4">{room.description}</p>
                            <span className="block font-medium text-black mb-4">{room.price}</span>
                            <Link
                                to="/rooms"
                                className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/rooms" className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition">
                    View All Rooms
                </Link>
            </div>
        </section>
    );
}
