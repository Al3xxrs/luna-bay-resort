import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

// Array of gallery image URLs
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

            {/* Hero Section with background image and animated title */}
            <section
                className="w-full h-[50vh] bg-cover bg-center relative flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/gallery-hero.jpg')" }}
            >
                {/* Dark overlay with blur */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                {/* Animated page title */}
                <motion.h1
                    className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-md"
                    initial={{ opacity: 0, y: -30, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    Gallery
                </motion.h1>
            </section>

            {/* Gallery Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                {/* Section title */}
                <motion.h2
                    className="text-2xl font-semibold text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Moments from Luna Bay
                </motion.h2>

                {/* Grid of images with hover effect and animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((src, i) => (
                        <motion.div
                            key={src} // Use image URL as key for uniqueness
                            className="relative overflow-hidden rounded-xl shadow-lg group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <img
                                src={src}
                                alt={`Luna Bay Resort view ${i + 1}`}
                                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500 backdrop-blur-sm flex items-center justify-center">
                                <p className="text-white font-medium text-lg">View {i + 1}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
