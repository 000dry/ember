import { BrowserRouter, Routes, Route } from "react-router";
import Trip from "./pages/Trip/Trip";
import Home from "./pages/Home/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trip/:id" element={<Trip />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router