import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaTripadvisor } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Brand */}
                <div>
                    <h3 className="text-2xl font-semibold mb-3">Luna Bay Resort</h3>
                    <p className="text-sm">Escape. Unwind. Recharge. Experience paradise at Luna Bay.</p>
                </div>

                {/* Navigation */}
                <div>
                    <h4 className="font-semibold mb-2">Explore</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <Link to="/about" className="hover:underline">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/gallery" className="hover:underline">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/booking" className="hover:underline">
                                Book Now
                            </Link>
                        </li>
                        <li>
                            <a href="/admin/login" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Are you the admin?
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h4 className="font-semibold mb-2">Connect</h4>
                    <div className="flex justify-center md:justify-start space-x-4 text-lg mb-3">
                        <a href="#" aria-label="Instagram" className="hover:text-black">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-black">
                            <FaFacebookF />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-black">
                            <FaTwitter />
                        </a>
                        <a href="#" aria-label="Tripadvisor" className="hover:text-black">
                            <FaTripadvisor />
                        </a>
                    </div>
                    <p className="text-sm">
                        123 Luna Bay Rd, Maldives
                        <br />
                        contact@lunabayresort.com
                        <br />
                        +1 (800) 555-6789
                    </p>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-10">
                © {new Date().getFullYear()} Luna Bay Resort. All rights reserved.
            </div>
        </footer>
    );
}
