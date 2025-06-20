import { useState, useEffect } from "react";
import axios from "axios";

const AdminRoomForm = ({ editingRoom, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price_per_night: "",
        image_url: "",
        imageFile: null,
        features: [],
    });
    const [availableFeatures, setAvailableFeatures] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingRoom) {
            const normalizedFeatures = Array.isArray(editingRoom.features)
                ? editingRoom.features.map((f) => (typeof f === "string" ? f : f.name))
                : [];

            setFormData({
                id: editingRoom.id,
                name: editingRoom.name,
                description: editingRoom.description,
                price_per_night: editingRoom.price_per_night,
                image_url: editingRoom.image_url,
                features: normalizedFeatures,
            });
        }
    }, [editingRoom]);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms/features`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setAvailableFeatures(res.data))
            .catch((err) => console.error("Failed to fetch features:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFeatureToggle = (featureName) => {
        setFormData((prev) => {
            const features = prev.features.includes(featureName)
                ? prev.features.filter((f) => f !== featureName)
                : [...prev.features, featureName];
            return { ...prev, features };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("adminToken");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price_per_night", formData.price_per_night);
        data.append("features", JSON.stringify(formData.features));
        if (formData.imageFile) {
            data.append("image", formData.imageFile);
        }
        if (editingRoom?.id) {
            data.append("id", editingRoom.id);
        }

        try {
            await axios({
                method: editingRoom ? "put" : "post",
                url: `${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms`,
                data,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            onSuccess();
        } catch (err) {
            console.error("Failed to save room:", err);
            alert("Failed to save room.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6 bg-white p-8 max-w-2xl mx-auto " onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{editingRoom ? "Edit Room" : "Create Room"}</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                    placeholder="e.g. Deluxe Suite"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                    placeholder="Write a short room description..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night ($)</label>
                <input
                    type="number"
                    step="0.01"
                    name="price_per_night"
                    value={formData.price_per_night}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                    placeholder="e.g. 149.99"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setFormData((prev) => ({ ...prev, imageFile: file }));
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setFormData((prev) => ({ ...prev, image_url: reader.result }));
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    className="w-full text-sm text-gray-600 file:border file:rounded-lg file:px-3 file:py-1.5 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.image_url && (
                    <img
                        src={
                            formData.image_url.startsWith("data:")
                                ? formData.image_url
                                : `${import.meta.env.VITE_API_BASE_URL}${formData.image_url}`
                        }
                        alt="Preview"
                        className="mt-4 rounded-lg shadow-lg w-full max-w-sm object-cover transition-all duration-300"
                    />
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Features</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableFeatures.map((f) => (
                        <label
                            key={f.id}
                            className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-blue-50 transition"
                        >
                            <input
                                type="checkbox"
                                checked={formData.features.includes(f.name)}
                                onChange={() => handleFeatureToggle(f.name)}
                                className="accent-blue-600"
                            />
                            <span className="text-sm text-gray-700">{f.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Saving..." : editingRoom ? "Update Room" : "Create Room"}
                </button>
            </div>
        </form>
    );
};

export default AdminRoomForm;
