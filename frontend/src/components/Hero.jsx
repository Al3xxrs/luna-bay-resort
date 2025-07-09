import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export default function Hero() {
    // Animation variants
    const container = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.2 },
        },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section
            className="relative h-screen w-full bg-cover bg-center text-white"
            style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Animated content container */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-md" variants={fadeUp}>
                    Luna Bay Resort
                </motion.h1>

                <motion.p className="text-xl md:text-2xl mb-8 font-light" variants={fadeUp}>
                    Your Escape to Serenity
                </motion.p>

                <MotionLink
                    to="/booking"
                    className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium shadow-lg hover:bg-gray-100"
                    variants={fadeUp}
                >
                    Book Now
                </MotionLink>
            </motion.div>
        </section>
    );
}
