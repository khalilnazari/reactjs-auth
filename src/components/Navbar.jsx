import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/");
    };

    return (
        <div className=" bg-gray-200 mb-4 py-5 px-2">
            <div className="max-w-[1100px] mx-auto flex items-center justify-between">
                <div className="flex items-center justify-center space-x-5">
                    <p className="font-medium">
                        <Link to="/admin">Admin</Link>
                    </p>
                    <p className="font-medium">
                        <Link to="/finance">Finance</Link>
                    </p>
                    <p className="font-medium">
                        <Link to="/programmer">Programmer</Link>
                    </p>
                    <p className="font-medium">
                        <Link to="/marketer">Marketer</Link>
                    </p>
                    <p className="font-medium">
                        <Link to="/lounge">Lounge</Link>
                    </p>
                </div>

                <div>
                    <button className="font-medium" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
