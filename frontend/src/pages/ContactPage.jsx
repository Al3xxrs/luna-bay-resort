import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <main className="bg-white text-gray-800">
            <Navbar />

            {/* Hero */}
            <section
                className="h-[50vh] bg-cover bg-center relative flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <motion.h1
                    className="relative z-10 text-4xl md:text-5xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Contact Us
                </motion.h1>
            </section>

            {/* Contact Info & Form */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-semibold mb-4">We’d love to hear from you</h2>
                    <p className="text-gray-600 mb-6">Whether you're planning your stay or have questions, our team is here to help.</p>
                    <ul className="text-gray-700 space-y-4">
                        <li>📍 Luna Bay Resort, Coastal Drive, Paradise Island</li>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>✉️ hello@lunabayresort.com</li>
                        <li>🕒 Open Daily: 7am – 10pm</li>
                    </ul>
                </motion.div>

                {/* Form */}
                <motion.form
                    className="space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Message sent!");
                    }}
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            rows="5"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                        Send Message
                    </button>
                </motion.form>
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
        </main>
    );
}
