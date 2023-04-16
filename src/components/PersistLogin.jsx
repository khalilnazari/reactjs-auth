import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useRefereshToken from "../hooks/useRefreshToken";
import FullPageLoading from "./FullPageLoading";

const PersistLogin = () => {
    const refresh = useRefereshToken();

    const { auth, persistAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {!persistAuth && auth?.accessToken ? (
                <Outlet />
            ) : isLoading ? (
                <FullPageLoading />
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
