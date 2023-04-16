import axios from "../api/axios";
import useAuth from "./useAuth";
function useRefereshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true,
            });
            setAuth(response?.data);
            return response.data.accessToken;
        } catch (error) {
            console.log("Couldn't get refreshTokent", error);
        }
    };
    return refresh;
}

export default useRefereshToken;
