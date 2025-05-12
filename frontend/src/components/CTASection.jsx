import React from "react";
import { Link } from "react-router-dom";

export default function CallToAction() {
    return (
        <section
            className="relative bg-cover bg-center text-white py-20 px-6 md:px-12"
            style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-semibold mb-6">Ready to plan your escape?</h2>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                    Come find your peace at Luna Bay Resort — sun, sea, and serenity await.
                </p>
                <Link
                    to="/booking"
                    className="inline-block px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition"
                >
                    Book Now
                </Link>
            </div>
        </section>
    );
}
