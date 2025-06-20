import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Destructure motion elements to prevent ESLint 'unused' warnings
const { div: MotionDiv, h1: MotionH1, p: MotionP, a: MotionA } = motion;

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
            <MotionDiv
                className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <MotionH1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-md" variants={fadeUp}>
                    Luna Bay Resort
                </MotionH1>

                <MotionP className="text-xl md:text-2xl mb-8 font-light" variants={fadeUp}>
                    Your Escape to Serenity
                </MotionP>

                <MotionA
                    as={Link}
                    to="/booking"
                    className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium shadow-lg hover:bg-gray-100"
                    variants={fadeUp}
                >
                    Book Now
                </MotionA>
            </MotionDiv>
        </section>
    );
}
