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
import PersistLogin from "./components/PersistLogin";
import useAuth from "./hooks/useAuth";

const ROLES = {
    Admin: 2001,
    Programmer: 9001,
    Finance: 8001,
    Marketer: 7001,
};

function App() {
    const { auth } = useAuth();

    return (
        <Routes>
            <Route element={<Layout />}>
                {/* public pages */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                <Route element={<PersistLogin />}>
                    {/* authorized pages */}
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                    >
                        <Route path="/admin" element={<Admin />} />
                    </Route>

                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.Finance]} />}
                    >
                        <Route path="/finance" element={<Finance />} />
                    </Route>

                    <Route
                        element={
                            <RequireAuth allowedRoles={[ROLES.Programmer]} />
                        }
                    >
                        <Route path="/programmer" element={<Programmer />} />
                    </Route>

                    <Route
                        element={
                            <RequireAuth allowedRoles={[ROLES.Marketer]} />
                        }
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
                </Route>
                {/* not found pages */}
                <Route path="*" element={<Notfound />} />
            </Route>
        </Routes>
    );
}

export default App;
