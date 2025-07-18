import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaUmbrellaBeach, FaSwimmer, FaSpa, FaUtensils, FaCocktail, FaWifi } from "react-icons/fa";

const amenities = [
    { icon: FaUmbrellaBeach, title: "Private Beach" },
    { icon: FaSwimmer, title: "Infinity Pool" },
    { icon: FaSpa, title: "Oceanview Spa" },
    { icon: FaUtensils, title: "Gourmet Dining" },
    { icon: FaCocktail, title: "Sunset Bar" },
    { icon: FaWifi, title: "Free Wi-Fi" },
];

export default function Amenities() {
    return (
        <section className="bg-white py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <motion.h2
                    className="text-4xl font-semibold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Resort Amenities
                </motion.h2>
                <motion.p
                    className="text-gray-600 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Everything you need for a luxurious, relaxing stay.
                </motion.p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-center">
                {amenities.map(({ icon, title }, index) => {
                    const Icon = icon;
                    return (
                        <motion.div
                            key={title}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="bg-gray-100 p-4 rounded-full shadow-sm mb-3">
                                <Icon className="text-3xl text-black" />
                            </div>
                            <p className="text-sm font-medium">{title}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
