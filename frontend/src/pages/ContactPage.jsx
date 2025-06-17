import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";

// Extract motion components to avoid eslint unused vars error
const { main: MotionMain, section: MotionSection, h1: MotionH1, div: MotionDiv, form: MotionForm } = motion;

// Animation variants
const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const inputStyles = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black";

export default function ContactPage() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [statusType, setStatusType] = useState(null);

    // Form submit handler
    async function handleSubmit(e) {
        e.preventDefault();
        setStatusMessage(null);

        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, { name, email, message });
            if (response.status === 200) {
                setStatusMessage("Message sent successfully!");
                setStatusType("success");
                e.target.reset();
            } else {
                setStatusMessage("Failed to send message. Please try again.");
                setStatusType("error");
            }
        } catch (error) {
            console.error("Contact form error:", error);
            setStatusMessage("Something went wrong. Please try again later.");
            setStatusType("error");
        }
    }

    return (
        <MotionMain className="bg-white text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Navbar />

            {/* Hero */}
            <MotionSection
                className="h-[50vh] bg-cover bg-center relative flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
                initial="hidden"
                animate="visible"
                variants={fadeInDown}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <MotionH1 className="relative z-10 text-4xl md:text-5xl font-bold">Contact Us</MotionH1>
            </MotionSection>

            {/* Contact Info & Form */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
                {/* Info */}
                <MotionDiv initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
                    <h2 className="text-2xl font-semibold mb-4">We’d love to hear from you</h2>
                    <p className="text-gray-600 mb-6">Whether you're planning your stay or have questions, our team is here to help.</p>
                    <ul className="text-gray-700 space-y-4">
                        <li>📍 Luna Bay Resort, Coastal Drive, Paradise Island</li>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>✉️ hello@lunabayresort.com</li>
                        <li>🕒 Open Daily: 7am – 10pm</li>
                    </ul>
                </MotionDiv>

                {/* Form */}
                <MotionForm
                    className="space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideInRight}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                >
                    {statusMessage && (
                        <div
                            role="alert"
                            className={`p-3 rounded mb-4 text-center ${
                                statusType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                            {statusMessage}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            type="text"
                            required
                            className={inputStyles}
                            aria-required="true"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            placeholder="Your email address"
                            type="email"
                            required
                            className={inputStyles}
                            aria-required="true"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message here..."
                            rows="5"
                            required
                            className={inputStyles}
                            aria-required="true"
                        />
                    </div>
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                        Send Message
                    </button>
                </MotionForm>
            </section>

            {/* Google Map */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        className="w-full h-96 border-0"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.095194246593!2d-122.4194156846785!3d37.77492927975926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5c3d8e65%3A0x9e6c8e0b8e36c0b2!2sGolden%20Gate%20Park!5e0!3m2!1sen!2sus!4v1716012345678"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Luna Bay Resort Location"
                    ></iframe>
                </div>
            </section>

            <Footer />
        </MotionMain>
    );
}
