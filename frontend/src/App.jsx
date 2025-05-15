import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
// import RoomPage from "./pages/RoomPage"; // Uncomment when you create the RoomPage
import GalleryPage from "./pages/GalleryPage";
// import ContactPage from "./pages/ContactPage"; // Uncomment when you create the ContactPage
// import other pages as you build them

function App() {
    return (
        <Router>
            {/* Optional: add a persistent navbar or layout here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                {/* <Route path="/rooms" element={<RoomPage />} /> Uncomment when you create the RoomPage */}
                <Route path="/gallery" element={<GalleryPage />} />
                {/* <Route path="/contact" element={<ContactPage />} /> Uncomment when you create the ContactPage */}
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
