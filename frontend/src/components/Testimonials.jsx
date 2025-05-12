import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Guest Stories</h2>
                <p className="text-gray-600 text-lg">What our guests are saying</p>
            </div>

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
                {testimonials.map((t, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center text-center">
                            <img src={t.image} alt={t.name} className="w-20 h-20 object-cover rounded-full mb-4" />
                            <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                            <span className="font-medium text-black">{t.name}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
