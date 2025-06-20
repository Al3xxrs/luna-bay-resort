import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => {
        setIsOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 700);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
                scrolled ? "bg-white/90 shadow-md" : "bg-white/30"
            } backdrop-blur-md`}
        >
            <div className="mx-auto px-6 md:px-12 flex items-center justify-between md:h-25 h-16">
                {/* Logo */}
                <Link to="/" className="pb-2 space-x-2">
                    <img src="/images/logo.png" alt="Luna Bay Resort logo" className="object-contain md:h-24 h-16" />
                </Link>

                {/* Desktop Nav */}
                <motion.nav className="hidden md:flex space-x-6 font-medium text-sm" variants={navVariants} initial="hidden" animate="show">
                    {["About", "Gallery", "Contact"].map((label) => (
                        <motion.div key={label} variants={linkVariants}>
                            <Link to={`/${label.toLowerCase()}`} className="hover:text-black/80 py-2">
                                {label}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div variants={linkVariants}>
                        <Link to="/booking" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition text-sm">
                            Book Now
                        </Link>
                    </motion.div>
                </motion.nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden text-xl cursor-pointer" onClick={toggleMenu} aria-label="Toggle navigation menu">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden absolute top-16 left-0 w-full z-40 transition-colors duration-300 ${
                            scrolled ? "bg-white/90" : "bg-white/30"
                        } backdrop-blur-md shadow-md`}
                    >
                        <div className="flex flex-col items-center space-y-4 py-6 font-medium text-sm">
                            <Link to="/about" onClick={closeMenu}>
                                About
                            </Link>
                            <Link to="/gallery" onClick={closeMenu}>
                                Gallery
                            </Link>
                            <Link to="/contact" onClick={closeMenu}>
                                Contact
                            </Link>
                            <Link
                                to="/booking"
                                onClick={closeMenu}
                                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                            >
                                Book Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
