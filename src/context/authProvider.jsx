import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persistAuth, setPersistAuth] = useState(
        JSON.parse(localStorage.getItem("persistLogin")) || false
    );

    useEffect(() => {
        localStorage.setItem("persistLogin", JSON.stringify(persistAuth));
    }, [persistAuth]);

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, persistAuth, setPersistAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
