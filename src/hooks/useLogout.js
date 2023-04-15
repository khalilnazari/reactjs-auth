import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const logout = async () => {
        try {
            const response = await axios("/logout", { withCredentials: true });
            if (response.status === 204) {
                setAuth(null);
                navigate("/");
            }
        } catch (error) {
            console.log("Logout failed");
            console.log(error);
        }
    };
    return logout;
};

export default useLogout;
