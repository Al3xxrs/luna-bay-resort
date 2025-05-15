import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
    "/images/gallery7.jpg",
    "/images/gallery8.jpg",
];

export default function GalleryPage() {
    return (
        <main className="bg-white text-gray-800">
            <Navbar />

            {/* Hero */}
            <section
                className="w-full h-[50vh] bg-cover bg-center relative flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/gallery-hero.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <motion.h1
                    className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-md"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Gallery
                </motion.h1>
            </section>

            {/* Gallery Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-semibold text-center mb-10">Moments from Luna Bay</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((src, i) => (
                        <motion.div
                            key={i}
                            className="overflow-hidden rounded-xl shadow-md cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <img
                                src={src}
                                alt={`Luna Bay ${i + 1}`}
                                className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
