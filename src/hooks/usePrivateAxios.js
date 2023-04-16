import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefereshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const referesh = useRefereshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.eject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const preveReques = error?.config;
                if (error?.response?.status === 403 && !preveReques?.sent) {
                    preveReques.sent = true;
                    const accessToken = await referesh();
                    preveReques.headers[
                        "Authorization"
                    ] = `Bearer ${accessToken}`;
                    return axiosPrivate(preveReques);
                }

                return Promise.reject(error);
            }
        );

        // clean up useEffect
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, referesh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
