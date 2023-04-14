import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Finance from "./pages/Finance";
import Programmer from "./pages/Programmer";
import Marketer from "./pages/Marketer";
import Layout from "./components/Layout";
import Lounge from "./pages/Lounge";
import RequireAuth from "./pages/RequireAuth";
import Notfound from "./pages/Notfound";
import Unauthorized from "./pages/UnAuthorized";

const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
    Programmer: 7000,
    Finance: 899,
    Marketer: 6777,
};

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* public pages */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* authorized pages */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Finance]} />}>
                    <Route path="/finance" element={<Finance />} />
                </Route>

                <Route
                    element={<RequireAuth allowedRoles={[ROLES.Programmer]} />}
                >
                    <Route path="/programmer" element={<Programmer />} />
                </Route>

                <Route
                    element={<RequireAuth allowedRoles={[ROLES.Marketer]} />}
                >
                    <Route path="/marketer" element={<Marketer />} />
                </Route>

                <Route
                    element={
                        <RequireAuth
                            allowedRoles={[
                                ROLES.Programmer,
                                ROLES.Admin,
                                ROLES.Marketer,
                                ROLES.Finance,
                            ]}
                        />
                    }
                >
                    <Route path="/lounge" element={<Lounge />} />
                </Route>

                {/* not found pages */}
                <Route path="*" element={<Notfound />} />
            </Route>
        </Routes>
    );
}

export default App;
