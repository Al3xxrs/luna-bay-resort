import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
];

const { div: MotionDiv } = motion;

export default function GalleryTeaser() {
    return (
        <section className="bg-white py-16 px-6 md:px-12">
            <MotionDiv
                className="max-w-6xl mx-auto text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl font-semibold mb-4">Moments at Luna Bay</h2>
                <p className="text-gray-600 text-lg">From sunrises to stargazing — take a glimpse into life at our resort.</p>
            </MotionDiv>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
                {images.map((src, index) => (
                    <MotionDiv
                        key={index}
                        className="overflow-hidden rounded-xl shadow-md group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <img
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition duration-300"
                        />
                    </MotionDiv>
                ))}
            </div>

            <MotionDiv
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <Link
                    to="/gallery"
                    className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition"
                >
                    View Full Gallery
                </Link>
            </MotionDiv>
        </section>
    );
}
