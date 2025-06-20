import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
    {
        name: "Sophia M.",
        quote: "Luna Bay was pure magic — the sunsets, the spa, the food. I already miss it.",
        image: "/images/testimonial1.jpg",
    },
    {
        name: "James R.",
        quote: "I came to relax and recharge, and left with memories I’ll never forget. Truly paradise.",
        image: "/images/testimonial2.jpg",
    },
    {
        name: "Amira D.",
        quote: "Incredible service, stunning views, and peaceful vibes. Can’t wait to come back.",
        image: "/images/testimonial3.jpg",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-gray-100 py-16 px-6 md:px-12">
            {/* Section Header */}
            <motion.div
                className="max-w-4xl mx-auto text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl font-semibold mb-4">Guest Stories</h2>
                <p className="text-gray-600 text-lg">What our guests are saying</p>
            </motion.div>

            {/* Swiper Slider for testimonials */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                className="max-w-3xl mx-auto"
            >
                {testimonials.map(({ name, quote, image }, index) => (
                    <SwiperSlide key={name + index}>
                        <motion.div
                            className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center text-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <img src={image} alt={name} className="w-20 h-20 object-cover rounded-full mb-4" loading="lazy" />
                            <p className="text-gray-700 italic mb-4">“{quote}”</p>
                            <span className="font-medium text-black">{name}</span>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
