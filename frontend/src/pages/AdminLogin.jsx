import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const inputStyles = "w-full border p-3 rounded mb-4";
    const buttonStyles = "w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition";

    const handleRequestCode = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/request-code`, { email });
            setStep(2);
        } catch (err) {
            handleError(err, "Failed to request code.");
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            setError("");
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/verify-code`, { email, code });
            localStorage.setItem("adminToken", data.token);
            navigate("/admin-dashboard");
        } catch (err) {
            handleError(err, "Failed to verify code.");
        }
    };

    const handleError = (err, fallbackMsg) => {
        const message = err.response?.data?.message || fallbackMsg;
        setError(message);
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

                {/* Step 1: Email Form */}
                {step === 1 && (
                    <form onSubmit={handleRequestCode}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter admin email"
                            className={inputStyles}
                            required
                            aria-label="Admin Email"
                        />
                        <button type="submit" className={buttonStyles}>
                            Send Code
                        </button>
                    </form>
                )}

                {/* Step 2: Code Form */}
                {step === 2 && (
                    <form onSubmit={handleVerifyCode}>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter verification code"
                            className={inputStyles}
                            required
                            aria-label="Verification Code"
                        />
                        <button type="submit" className={buttonStyles}>
                            Verify Code
                        </button>
                    </form>
                )}

                {/* Error Message */}
                {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            </div>
        </main>
    );
}
