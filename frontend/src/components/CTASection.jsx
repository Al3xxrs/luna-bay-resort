import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function CallToAction() {
    return (
        <section
            className="relative bg-cover bg-center text-white py-20 px-6 md:px-12"
            style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-semibold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Ready to plan your escape?
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl mb-8 text-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Come find your peace at Luna Bay Resort — sun, sea, and serenity await.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link
                        to="/booking"
                        aria-label="Book your stay at Luna Bay Resort"
                        className="inline-block px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition"
                    >
                        Book Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
