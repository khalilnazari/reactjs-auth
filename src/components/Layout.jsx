import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-[1100px] mx-auto p-2">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
