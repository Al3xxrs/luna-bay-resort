import { lazy, Suspense } from "react";

// Lazy-load non-critical sections (below the fold)
const Navbar = lazy(() => import("../components/Navbar"));
const Hero = lazy(() => import("../components/Hero"));
const AboutPreview = lazy(() => import("../components/AboutPreview"));
const RoomPreview = lazy(() => import("../components/RoomPreview"));
const Amenities = lazy(() => import("../components/Amenities"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const GalleryTeaser = lazy(() => import("../components/GalleryTeaser"));
const CTASection = lazy(() => import("../components/CTASection"));
const Footer = lazy(() => import("../components/Footer"));

export default function Home() {
    return (
        <div className="flex flex-col">
            <Suspense fallback={<div className="text-center py-20 animate-pulse text-gray-500">Loading sections...</div>}>
                <Navbar />
                <Hero />
                <AboutPreview />
                <RoomPreview />
                <Amenities />
                <Testimonials />
                <GalleryTeaser />
                <CTASection />
                <Footer />
            </Suspense>
        </div>
    );
}
