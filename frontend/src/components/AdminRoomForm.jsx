import { useState, useEffect } from "react";
import axios from "axios";

const AdminRoomForm = ({ editingRoom, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price_per_night: "",
        image_url: "",
        features: [],
    });
    const [availableFeatures, setAvailableFeatures] = useState([]);

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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAvailableFeatures(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch features:", err);
            });
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
        const token = localStorage.getItem("adminToken");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price_per_night", formData.price_per_night);
        data.append("features", JSON.stringify(formData.features));
        if (formData.imageFile) {
            data.append("image", formData.imageFile); // assuming backend uses `req.file`
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
        }
    };

    return (
        <form className="space-y-4 bg-white p-6 shadow rounded-xl max-w-xl mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-2">{editingRoom ? "Edit Room" : "Create Room"}</h2>

            <input
                type="text"
                name="name"
                placeholder="Room name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full border p-2 rounded"
            />

            <input
                type="number"
                step="0.01"
                name="price_per_night"
                placeholder="Price per night"
                value={formData.price_per_night}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />

            <div>
                <label className="block mb-1 font-medium">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setFormData((prev) => ({ ...prev, imageFile: file }));

                            // Preview
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setFormData((prev) => ({ ...prev, image_url: reader.result }));
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    className="w-full border p-2 rounded"
                />
                {formData.image_url && (
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${formData.image_url}`}
                        alt="Preview"
                        className="mt-2 rounded w-full max-w-xs object-cover"
                    />
                )}
            </div>

            <div>
                <label className="block mb-1 font-medium">Features</label>
                <div className="grid grid-cols-2 gap-2">
                    {availableFeatures.map((f) => (
                        <label key={f.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.features.includes(f.name)}
                                onChange={() => handleFeatureToggle(f.name)}
                            />
                            <span>{f.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                {editingRoom ? "Update Room" : "Create Room"}
            </button>
        </form>
    );
};

export default AdminRoomForm;
