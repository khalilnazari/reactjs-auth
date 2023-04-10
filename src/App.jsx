import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Finance from "./pages/Finance";
import Programmer from "./pages/Programmer";
import Marketer from "./pages/Marketer";
import Layout from "./components/Layout";
import Lounge from "./pages/Lounge";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/programmer" element={<Programmer />} />
                <Route path="/marketer" element={<Marketer />} />
                <Route path="/lounge" element={<Lounge />} />
            </Route>
        </Routes>
    );
}

export default App;
