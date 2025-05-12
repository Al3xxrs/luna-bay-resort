import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import other pages as you build them

function App() {
    return (
        <Router>
            {/* Optional: add a persistent navbar or layout here */}
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Add more routes as you go */}
                {/* <Route path="/about" element={<About />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
