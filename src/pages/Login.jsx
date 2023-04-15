import { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth } = useAuth();
    const emailRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectedFrom = location?.state?.from?.pathname || "lounge";
    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const validate = ({ email, password }) => {
        const errors = {};
        if (!email) {
            errors.email = "Enter your email address";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = "Invalid email address";
        }

        if (!password) {
            errors.password = "Enter your password";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: (values) => {
            if (Object.keys(values).length === 0) return;
            handleLogin(values);
        },
    });

    const handleLogin = async (e) => {
        setAuthLoading(true);
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user: e.email, pwd: e.password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setAuth(response.data);
            navigate(redirectedFrom, { replace: true });
            setAuthLoading(false);
        } catch (error) {
            if (error.response.status === 403) {
                setAuthError("Invalid credinticals!");
            } else if (error.response.status === 500) {
                setAuthError("Server error.");
            } else {
                setAuthError(
                    "An error happened. Please also check your internet connection."
                );
            }
            setAuthLoading(false);
        }
    };
    // checking errors
    const isFormFilled = Object.values(formik.values).every((el) => el === "");
    const hasError = Object.keys(formik.errors).length !== 0;

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-gray-100 p-5 xs:p-4 sm:p-8 w-full mx-4 sm:mx-auto sm:max-w-[400px]">
                <h2 className="font-bold text-gray-700 text-xl uppercase mb-5">
                    User Login
                </h2>

                <form onSubmit={formik.handleSubmit} className="w-full">
                    {authError && (
                        <div className="p-2 mb-2 bg-red-300">{authError}</div>
                    )}
                    <div className="mb-1">
                        <label
                            className="font-medium text-gray-800"
                            htmlFor="email"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                autoComplete="off"
                                {...formik.getFieldProps("email")}
                                className="border w-full p-2"
                            />
                        </div>

                        {formik.errors.email && formik.touched.email ? (
                            <span className="font-thin text-sm text-red-700">
                                {formik.errors.email}
                            </span>
                        ) : (
                            <span className="font-thin text-sm text-transparent">
                                no error
                            </span>
                        )}
                    </div>

                    <div className="mb-1">
                        <label
                            className="font-medium text-gray-800"
                            htmlFor="password"
                        >
                            Password
                        </label>

                        <div className="relative mb-1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="border w-full p-2"
                                placeholder="Password"
                                autoComplete="off"
                                {...formik.getFieldProps("password")}
                            />
                        </div>
                        {formik.errors.password && formik.touched.password ? (
                            <div className="font-thin text-sm text-red-700">
                                {formik.errors.password}
                            </div>
                        ) : (
                            <span className="font-thin text-sm text-transparent">
                                no error
                            </span>
                        )}
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-3 w-full bg-gray-700 text-gray-100 p-2 disabled:cursor-not-allowed"
                            disabled={isFormFilled || hasError || authLoading}
                        >
                            {authLoading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </form>

                <div className="text-right">
                    <span>
                        <Link
                            to="/register"
                            className="font-medium hover:underline"
                        >
                            Sign up
                        </Link>{" "}
                        if you are new
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
