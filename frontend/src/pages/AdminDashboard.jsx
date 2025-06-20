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

    // Check token and fetch data on mount
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin-login");
        } else {
            fetchDashboardData(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    // Fetch bookings and rooms data
    const fetchDashboardData = async (token) => {
        try {
            const [bookingsRes, roomsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/bookings`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            setBookings(bookingsRes.data);
            setRooms(roomsRes.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            navigate("/admin-login");
        }
    };

    // Prepare booking for editing
    const handleEdit = (booking) => {
        setEditingBooking({
            ...booking,
            originalCheckIn: booking.checkIn,
            checkIn: booking.checkIn.slice(0, 10),
            checkOut: booking.checkOut.slice(0, 10),
        });
        setEditModalOpen(true);
    };

    // Submit booking edits
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) return navigate("/admin-login");

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/admin/bookings`,
                {
                    guest_id: editingBooking.guest_id,
                    room_id: editingBooking.room_id,
                    originalCheckIn: editingBooking.originalCheckIn.slice(0, 10),
                    checkIn: editingBooking.checkIn,
                    checkOut: editingBooking.checkOut,
                    num_guests: editingBooking.guests,
                    fullName: editingBooking.fullName,
                    email: editingBooking.email,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { totalPrice } = response.data;

            setBookings((prev) =>
                prev.map((b) =>
                    b.guest_id === editingBooking.guest_id &&
                    b.room_id === editingBooking.room_id &&
                    b.checkIn === editingBooking.originalCheckIn
                        ? {
                              ...editingBooking,
                              totalPrice,
                              checkIn: editingBooking.checkIn,
                          }
                        : b
                )
            );

            setEditModalOpen(false);
            setEditingBooking(null);
        } catch (err) {
            console.error("Edit failed:", err);
            alert("Failed to update booking.");
        }
    };

    // Delete a booking
    const handleDelete = async (booking) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return navigate("/admin-login");

        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/bookings`, {
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
            alert("Failed to delete booking.");
        }
    };

    // Delete a room
    const handleDeleteRoom = async (id) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return navigate("/admin-login");

        if (!window.confirm("Delete this room?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchDashboardData(token);
        } catch (err) {
            console.error("Room delete failed:", err);
            alert("Could not delete room.");
        }
    };

    const calculateTotalPrice = () => {
        const { checkIn, checkOut, room_id, guests } = editingBooking;
        const room = rooms.find((r) => r.id === room_id);

        if (!room || !checkIn || !checkOut || !guests) return 0;

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        if (nights < 1 || guests < 1) return 0;

        return room.price_per_night * nights * guests;
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
                    aria-label="Add new room"
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
                    <div className="bg-white rounded-4xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden relative">
                        <button
                            onClick={() => setRoomModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl leading-none"
                            aria-label="Close room form"
                        >
                            ×
                        </button>
                        <div className="overflow-y-auto max-h-[90vh] p-6">
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
                </div>
            )}

            {/* Booking Edit Modal */}
            {editModalOpen && editingBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <form
                        onSubmit={handleEditSubmit}
                        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg space-y-4 border border-gray-300"
                    >
                        <h2 className="text-2xl font-bold text-center">Edit Booking</h2>

                        {/* Guest Info */}
                        <div className="grid grid-cols-1 gap-4">
                            <label className="block">
                                Full Name
                                <input
                                    type="text"
                                    className="w-full mt-1 p-2 border rounded"
                                    value={editingBooking.fullName || ""}
                                    onChange={(e) => setEditingBooking({ ...editingBooking, fullName: e.target.value })}
                                />
                            </label>

                            <label className="block">
                                Email
                                <input
                                    type="email"
                                    className="w-full mt-1 p-2 border rounded"
                                    value={editingBooking.email || ""}
                                    onChange={(e) => setEditingBooking({ ...editingBooking, email: e.target.value })}
                                />
                            </label>
                        </div>

                        {/* Room Selector with Price */}
                        <label className="block">
                            Room
                            <select
                                className="w-full mt-1 p-2 border rounded"
                                value={editingBooking.room_id}
                                onChange={(e) => {
                                    const selectedRoom = rooms.find((r) => r.id === parseInt(e.target.value));
                                    setEditingBooking({
                                        ...editingBooking,
                                        newRoomId: selectedRoom.id,
                                        room_id: selectedRoom.id,
                                        roomPrice: selectedRoom.price_per_night,
                                    });
                                }}
                            >
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.name} - ${room.price_per_night}/night
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Dates and Guests */}
                        <div className="grid grid-cols-2 gap-4">
                            <label className="block">
                                Check-in
                                <input
                                    type="date"
                                    className="w-full mt-1 p-2 border rounded"
                                    value={editingBooking.checkIn}
                                    onChange={(e) => setEditingBooking({ ...editingBooking, checkIn: e.target.value })}
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                />
                            </label>
                            <label className="block">
                                Check-out
                                <input
                                    type="date"
                                    className="w-full mt-1 p-2 border rounded"
                                    value={editingBooking.checkOut}
                                    onChange={(e) => setEditingBooking({ ...editingBooking, checkOut: e.target.value })}
                                    min={editingBooking.checkIn}
                                    required
                                />
                            </label>
                        </div>

                        <label className="block">
                            Guests
                            <input
                                type="number"
                                className="w-full mt-1 p-2 border rounded"
                                min="1"
                                value={editingBooking.guests}
                                onChange={(e) => setEditingBooking({ ...editingBooking, guests: parseInt(e.target.value) || 1 })}
                            />
                        </label>

                        {/* Live Price Preview */}
                        {editingBooking.checkIn && editingBooking.checkOut && editingBooking.room_id && (
                            <div className="text-center mt-4">
                                <p className="text-lg font-medium text-gray-700">
                                    Total Price: <span className="font-bold text-blue-600">${calculateTotalPrice()}</span>
                                </p>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                                onClick={() => setEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}
