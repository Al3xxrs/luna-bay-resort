import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaTimes } from "react-icons/fa";
import axios from "axios";

export default function BookingPage() {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    // Reusable styles
    const inputStyles = "border rounded-md p-3 w-full";
    const buttonStyles = "w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition";

    // Fetch room data
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get("/api/rooms");
                setRooms(data);
            } catch (err) {
                console.error("Failed to load rooms:", err);
            }
        };

        fetchRooms();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
            const pricePerNight = selectedRoom ? parseFloat(selectedRoom.price_per_night) : 0;
            const total = pricePerNight * nights * guests;

            // Check availability
            const { data: availability } = await axios.get("/api/bookings/availability", {
                params: {
                    roomId: selectedRoom.id,
                    checkIn,
                    checkOut,
                },
            });

            if (!availability.available) {
                alert("This room is not available during the selected period. Please choose different dates.");
                return;
            }

            const bookingData = {
                fullName: e.target[0].value,
                email: e.target[1].value,
                phone: e.target[2].value,
                roomId: selectedRoom.id,
                roomName: selectedRoom.name,
                checkIn,
                checkOut,
                guests,
                totalPrice: total,
            };

            await axios.post("/api/bookings", bookingData);

            alert("Booking successfully submitted!");
            closeModal();
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="bg-white text-gray-800">
            <Navbar />

            {/* Hero Section */}
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

            {/* Room Cards */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-semibold text-center mb-12">Choose Your Room</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room, i) => (
                        <motion.div
                            key={room.id}
                            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <img src={room.image_url} alt={room.name} className="h-60 w-full object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">{room.description}</p>
                                <ul className="text-sm text-gray-500 mb-4 space-y-1">
                                    {Array.isArray(room.features) && room.features.map((f, j) => <li key={j}>• {f}</li>)}
                                </ul>
                                <p className="text-lg font-medium mb-4">${parseFloat(room.price_per_night).toFixed(2)}/night/person</p>
                                <button
                                    onClick={() => openModal(room)}
                                    className="mt-auto bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                                >
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Booking Modal */}
            <AnimatePresence>
                {showModal && selectedRoom && (
                    <motion.div
                        key="modal"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-8 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                aria-label="Close Booking Modal"
                            >
                                <FaTimes />
                            </button>

                            <h3 className="text-2xl font-semibold mb-6">Complete Your Booking</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="text" required placeholder="Full Name" className={inputStyles} />
                                    <input type="email" required placeholder="Email Address" className={inputStyles} />
                                    <input type="tel" required placeholder="Phone Number" className={inputStyles} />
                                    <input
                                        type="date"
                                        required
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className={inputStyles}
                                    />
                                    <input
                                        type="date"
                                        required
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className={inputStyles}
                                    />
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        placeholder="Number of Guests"
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                        className={inputStyles}
                                    />
                                </div>

                                {/* Booking Estimate */}
                                {checkIn && checkOut && guests > 0 && (
                                    <div className="mt-4 text-gray-800">
                                        {(() => {
                                            const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
                                            const rate = selectedRoom ? parseFloat(selectedRoom.price_per_night) : 0;
                                            const total = rate * nights * guests;

                                            return (
                                                <p className="text-lg font-medium">
                                                    Estimated Total: ${total.toLocaleString()} ({guests} guest{guests > 1 ? "s" : ""},{" "}
                                                    {nights} night{nights > 1 ? "s" : ""})
                                                </p>
                                            );
                                        })()}
                                    </div>
                                )}

                                <button type="submit" className={buttonStyles}>
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
