import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const { div: MotionDiv, h2: MotionH2 } = motion;

// Fade up animation variants with customizable delay based on index
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: i * 0.2,
        },
    }),
};

export default function AboutPage() {
    return (
        <motion.main className="bg-white text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Navigation bar */}
            <Navbar />

            {/* Hero section with background image and overlay */}
            <section
                className="w-full h-[60vh] bg-cover bg-center relative flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/about-full.jpg')" }}
            >
                {/* Dark overlay with blur */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                {/* Heading with fade-in from top */}
                <motion.h1
                    className="relative z-10 text-5xl font-bold drop-shadow-md"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    About Us
                </motion.h1>
            </section>

            {/* Welcome block with staggered fade-up animation */}
            <motion.section
                className="max-w-5xl mx-auto px-6 py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <motion.h2 className="text-3xl font-semibold mb-6 text-center" variants={fadeUp}>
                    Your Escape to Serenity
                </motion.h2>
                <motion.p className="text-lg leading-relaxed text-center text-gray-600" custom={1} variants={fadeUp}>
                    Luna Bay Resort is more than a destination — it's a feeling. Nestled in a hidden cove where palm trees sway and time
                    slows down, our resort was designed for seekers of peace, luxury, and a touch of magic. Every guest becomes part of our
                    story — one written in ocean breeze, golden sunsets, and laughter echoing down moonlit paths.
                </motion.p>
            </motion.section>

            {/* Our story section with image and text side by side */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    {/* Image with slide-in from left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <img src="/images/about-preview.jpg" alt="Our Story" className="rounded-xl shadow-lg w-full h-auto object-cover" />
                    </motion.div>
                    {/* Text content with fade-up stagger */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <motion.h3 className="text-2xl font-semibold mb-4" variants={fadeUp}>
                            A Story Carved in Sand and Sea
                        </motion.h3>
                        <motion.p className="text-gray-600 mb-4" custom={1} variants={fadeUp}>
                            Founded in 2002 by two ocean lovers with a dream, Luna Bay began as a single beach house and a shared vision: to
                            build a sanctuary where elegance meets nature. What started as a passion project blossomed into a world-class
                            resort renowned for its privacy, charm, and unforgettable experiences.
                        </motion.p>
                        <motion.p className="text-gray-600" custom={2} variants={fadeUp}>
                            Every corner of Luna Bay reflects our belief in simplicity, sustainability, and soulful hospitality. From
                            handcrafted cabanas to locally sourced cuisine, we honor the land, the culture, and the people who make it home.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* What makes us special section */}
            <motion.section className="py-20 px-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h3 className="text-2xl font-semibold mb-6" variants={fadeUp}>
                        What Makes Luna Bay Special
                    </motion.h3>
                    {/* List of unique features with fade up per item */}
                    <ul className="grid md:grid-cols-3 gap-8 text-left mt-8">
                        {[
                            {
                                title: "Tailored Experiences",
                                desc: "From sunrise yoga to private snorkeling trips, your stay is uniquely yours.",
                            },
                            {
                                title: "Sustainable Luxury",
                                desc: "Built with eco-conscious practices, powered by the sun, and landscaped with native flora.",
                            },
                            {
                                title: "Personal Touch",
                                desc: "Our staff remembers your name, your favorite drink, and the stories you share.",
                            },
                        ].map(({ title, desc }, i) => (
                            <motion.li key={title} className="bg-white shadow-md p-6 rounded-lg border" custom={i} variants={fadeUp}>
                                <h4 className="font-semibold text-lg mb-2">{title}</h4>
                                <p className="text-gray-600">{desc}</p>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </motion.section>

            {/* Final call-to-action with background image and overlay */}
            <section
                className="relative text-white py-20 px-6 text-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/about-cta.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                {/* Content container with staggered fade up */}
                <motion.div
                    className="relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 1,
                                ease: "easeOut",
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    <motion.h3 className="text-3xl font-semibold mb-4" variants={fadeUp}>
                        Come See It for Yourself
                    </motion.h3>
                    <motion.p className="text-lg mb-8 max-w-xl mx-auto" variants={fadeUp}>
                        Whether you're here to relax, reconnect, or rediscover yourself — Luna Bay is waiting with open arms and ocean
                        views.
                    </motion.p>
                    <motion.a
                        href="/booking"
                        className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                        variants={fadeUp}
                    >
                        Book Your Stay
                    </motion.a>
                </motion.div>
            </section>

            {/* Footer */}
            <Footer />
        </motion.main>
    );
}
