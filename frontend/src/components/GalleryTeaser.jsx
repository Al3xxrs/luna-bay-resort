import React from "react";
import { Link } from "react-router-dom";

const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
];

export default function GalleryTeaser() {
    return (
        <section className="bg-white py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Moments at Luna Bay</h2>
                <p className="text-gray-600 text-lg">From sunrises to stargazing — take a glimpse into life at our resort.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
                {images.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-xl shadow-md group">
                        <img
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition duration-300"
                        />
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Link
                    to="/gallery"
                    className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition"
                >
                    View Full Gallery
                </Link>
            </div>
        </section>
    );
}
