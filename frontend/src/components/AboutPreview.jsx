import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutPreview() {
    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const blurReveal = (delay = 0) => ({
        hidden: {
            opacity: 0,
            filter: "blur(8px)",
            clipPath: "inset(0 100% 0 0)",
        },
        show: {
            opacity: 1,
            filter: "blur(0px)",
            clipPath: "inset(0 0% 0 0)",
            transition: {
                duration: 1,
                ease: "easeOut",
                delay,
            },
        },
    });

    return (
        <section className="w-full bg-white py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Image */}
                <motion.div
                    className="w-full md:w-1/2"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <img
                        src="/images/about-preview.jpg"
                        alt="Luna Bay Resort"
                        className="rounded-2xl shadow-lg object-cover w-full h-80 md:h-96"
                    />
                </motion.div>

                {/* Text */}
                <div className="w-full md:w-1/2 text-center md:text-left overflow-hidden">
                    <motion.h2
                        className="text-4xl font-semibold mb-4"
                        variants={blurReveal(0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        Welcome to Paradise
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 text-lg mb-6"
                        variants={blurReveal(0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        Nestled on a tranquil bay, Luna Bay Resort is your escape to sunshine, serenity, and sea breeze. From luxury suites
                        to private beaches, every moment here is made to soothe your soul.
                    </motion.p>
                    <motion.div variants={blurReveal(0.6)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <Link
                            to="/about"
                            className="inline-block px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
                        >
                            Learn More
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
