import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import RoomPreview from "../components/RoomPreview";
import Amenities from "../components/Amenities";
import Testimonials from "../components/Testimonials";
import GalleryTeaser from "../components/GalleryTeaser";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Navbar />
            <Hero />
            <AboutPreview />
            <RoomPreview />
            <Amenities />
            <Testimonials />
            <GalleryTeaser />
            <CTASection />
            <Footer />
        </div>
    );
}
