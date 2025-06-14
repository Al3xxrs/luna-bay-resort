import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminRoomForm from "../components/AdminRoomForm";
import axios from "axios";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editRoom, setEditRoom] = useState(null);
    const [roomModalOpen, setRoomModalOpen] = useState(false);
    const navigate = useNavigate();

    // Check for admin token and fetch data
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
        } else {
            fetchDashboardData(token);
        }
    }, []);

    // Fetch bookings and rooms
    const fetchDashboardData = async (token) => {
        try {
            const [bookingsRes, roomsRes] = await Promise.all([
                axios.get("/api/admin/bookings", { headers: { Authorization: `Bearer ${token}` } }),
                axios.get("/api/admin/rooms", { headers: { Authorization: `Bearer ${token}` } }),
            ]);
            setBookings(bookingsRes.data);
            setRooms(roomsRes.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            navigate("/admin/login");
        }
    };

    // Handle booking edit
    const handleEdit = (booking) => {
        setEditingBooking({
            ...booking,
            originalCheckIn: booking.checkIn,
            checkIn: booking.checkIn.slice(0, 10),
            checkOut: booking.checkOut.slice(0, 10),
        });
        setEditModalOpen(true);
    };

    // Submit edited booking
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");

        try {
            await axios.put(
                "/api/admin/bookings",
                {
                    guest_id: editingBooking.guest_id,
                    room_id: editingBooking.room_id,
                    originalCheckIn: editingBooking.originalCheckIn.slice(0, 10),
                    checkIn: editingBooking.checkIn,
                    checkOut: editingBooking.checkOut,
                    num_guests: editingBooking.guests,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setBookings((prev) =>
                prev.map((b) =>
                    b.guest_id === editingBooking.guest_id &&
                    b.room_id === editingBooking.room_id &&
                    b.checkIn === editingBooking.originalCheckIn
                        ? { ...editingBooking }
                        : b
                )
            );

            setEditModalOpen(false);
            setEditingBooking(null);
        } catch (err) {
            console.error("Edit failed:", err);
        }
    };

    // Delete a booking
    const handleDelete = async (booking) => {
        const token = localStorage.getItem("adminToken");
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            await axios.delete("/api/admin/bookings", {
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    guest_id: booking.guest_id,
                    room_id: booking.room_id,
                    checkIn: booking.checkIn,
                },
            });

            setBookings((prev) =>
                prev.filter((b) => !(b.guest_id === booking.guest_id && b.room_id === booking.room_id && b.checkIn === booking.checkIn))
            );
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // Delete a room
    const handleDeleteRoom = async (id) => {
        const token = localStorage.getItem("adminToken");
        if (!window.confirm("Delete this room?")) return;

        try {
            await axios.delete(`/api/admin/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchDashboardData(token);
        } catch (err) {
            console.error("Room delete failed:", err);
            alert("Could not delete room.");
        }
    };

    return (
        <main className="min-h-screen p-8 bg-gray-50 text-gray-800">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

            {/* Room Management */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rooms.map((room) => (
                        <div key={room.id} className="bg-white rounded shadow p-4">
                            <h3 className="text-xl font-semibold">{room.name}</h3>
                            <p className="text-gray-600">{room.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                ${room.price_per_night}/night • {room.features.join(", ")}
                            </p>
                            <div className="mt-3 flex space-x-4">
                                <button
                                    onClick={() => {
                                        setEditRoom(room);
                                        setRoomModalOpen(true);
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteRoom(room.id)} className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        setEditRoom(null);
                        setRoomModalOpen(true);
                    }}
                    className="mt-6 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black font-medium px-5 py-2.5 rounded-2xl shadow transition duration-200"
                >
                    <span className="text-lg">+</span>
                    <span>Add Room</span>
                </button>
            </section>

            {/* Booking Management */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3">Guest</th>
                                <th className="p-3">Room</th>
                                <th className="p-3">Dates</th>
                                <th className="p-3">Guests</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={`${b.guest_id}-${b.room_id}-${b.checkIn}`} className="border-t">
                                    <td className="p-3">
                                        {b.fullName}
                                        <br />
                                        <span className="text-xs text-gray-500">{b.email}</span>
                                    </td>
                                    <td className="p-3">{b.roomName}</td>
                                    <td className="p-3">
                                        {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                                    </td>
                                    <td className="p-3">{b.guests}</td>
                                    <td className="p-3">${b.totalPrice}</td>
                                    <td className="p-3">
                                        <button onClick={() => handleEdit(b)} className="text-blue-500 mr-2">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(b)} className="text-red-500">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Room Modal */}
            {roomModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={() => setRoomModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                        <AdminRoomForm
                            editingRoom={editRoom}
                            onSuccess={() => {
                                fetchDashboardData(localStorage.getItem("adminToken"));
                                setRoomModalOpen(false);
                                setEditRoom(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Booking Edit Modal */}
            {editModalOpen && editingBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>

                        <label className="block mb-2">
                            Check-in:
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={editingBooking.checkIn}
                                onChange={(e) => setEditingBooking({ ...editingBooking, checkIn: e.target.value })}
                            />
                        </label>

                        <label className="block mb-2">
                            Check-out:
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={editingBooking.checkOut}
                                onChange={(e) => setEditingBooking({ ...editingBooking, checkOut: e.target.value })}
                            />
                        </label>

                        <label className="block mb-4">
                            Guests:
                            <input
                                type="number"
                                min="1"
                                className="w-full p-2 border rounded"
                                value={editingBooking.guests}
                                onChange={(e) => setEditingBooking({ ...editingBooking, guests: parseInt(e.target.value) })}
                            />
                        </label>

                        <div className="flex justify-end space-x-2">
                            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditModalOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}
