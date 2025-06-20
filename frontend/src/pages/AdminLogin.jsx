import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const inputStyles = "w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black";
    const buttonStyles =
        "w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed";

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/request-code`, { email });
            setStep(2);
        } catch (err) {
            const message = err.response?.data?.message || "Failed to request code.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/verify-code`, { email, code });
            localStorage.setItem("adminToken", data.token);
            navigate("/admin-dashboard");
        } catch (err) {
            const message = err.response?.data?.message || "Failed to verify code.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

                {step === 1 && (
                    <form onSubmit={handleRequestCode} aria-label="Request login code form">
                        <label htmlFor="admin-email" className="sr-only">
                            Admin Email
                        </label>
                        <input
                            id="admin-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter admin email"
                            className={inputStyles}
                            required
                            aria-required="true"
                            autoComplete="email"
                            disabled={loading}
                        />
                        <button type="submit" className={buttonStyles} disabled={loading}>
                            {loading ? "Sending..." : "Send Code"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyCode} aria-label="Verify code form">
                        <label htmlFor="verification-code" className="sr-only">
                            Verification Code
                        </label>
                        <input
                            id="verification-code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter verification code"
                            className={inputStyles}
                            required
                            aria-required="true"
                            disabled={loading}
                            autoComplete="one-time-code"
                        />
                        <button type="submit" className={buttonStyles} disabled={loading}>
                            {loading ? "Verifying..." : "Verify Code"}
                        </button>
                    </form>
                )}

                {error && (
                    <p className="mt-4 text-red-500 text-sm text-center" role="alert" aria-live="polite">
                        {error}
                    </p>
                )}
            </div>
        </main>
    );
}
