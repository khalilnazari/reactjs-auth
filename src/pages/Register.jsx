import { useFormik } from "formik";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const REGISTER_URL = "/register";

const Register = () => {
    const emailRef = useRef();
    const [registerError, setRegisterError] = useState(null);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // Set form validation error
    const validate = ({ email, password, confirmPassword }) => {
        const errors = {};

        if (!email) {
            errors.email = "Email is required.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = "Invalid email address";
        }

        if (!password) {
            errors.password = "Password is required.";
        } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(password)) {
            errors.password =
                "Password should contain at least one uppercase, one number and one symbole.";
        } else if (password.length < 9) {
            errors.password = "Password should more than 8 characters.";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Confirm your password.";
        } else if (confirmPassword !== password) {
            errors.confirmPassword = "Password does not match.";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate,
        onSubmit: (values) => {
            if (Object.keys(values).length === 0) return;
            registerUser(values);
        },
    });

    const registerUser = async (values) => {
        setRegisterLoading(true);
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    pwd: values.password,
                    user: values.email,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setRegisterLoading(false);
            console.log(response);
            setRegisterSuccess(
                "Account is successfully created! Please login."
            );
            setRegisterError(null);
        } catch (error) {
            setRegisterLoading(false);
            setRegisterSuccess(null);
            if (!error.response) {
                setRegisterError("No Server response");
            } else if (error.response.status === 409) {
                setRegisterError("A user with this email already exist.");
            } else {
                setRegisterError("Regiteration failed. Try again");
            }
        }
    };

    // checking errors
    const isFormFilled = Object.values(formik.values).every((el) => el === "");
    const hasError = Object.keys(formik.errors).length !== 0;

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-gray-100 p-4 xs:p-4 sm:p-8 w-full mx-4 sm:mx-auto sm:max-w-[400px]">
                <h2 className="font-bold text-gray-700 text-xl uppercase mb-5">
                    User Registration
                </h2>

                <form onSubmit={formik.handleSubmit} className="w-full">
                    {registerError ? (
                        <div className="bg-red-300 p-2 mb-2">
                            {registerError}
                        </div>
                    ) : null}

                    {registerSuccess ? (
                        <div className="bg-green-300 p-2 mb-2">
                            {registerSuccess}
                        </div>
                    ) : null}
                    <div className="mb-3">
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
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label
                            className="font-medium text-gray-800"
                            htmlFor="password"
                        >
                            Password
                        </label>

                        <div className="relative">
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
                            <span className="font-thin text-sm text-red-700">
                                {formik.errors.password}
                            </span>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label
                            className="font-medium text-gray-800"
                            htmlFor="confirmPassword"
                        >
                            Confirm your password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="border w-full p-2"
                                placeholder="Confirm password"
                                autoComplete="off"
                                {...formik.getFieldProps("confirmPassword")}
                            />
                        </div>

                        {formik.errors.confirmPassword &&
                        formik.touched.confirmPassword ? (
                            <span className="font-thin text-sm text-red-700">
                                {formik.errors.confirmPassword}
                            </span>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-gray-700 text-gray-100 p-2 disabled:cursor-not-allowed"
                            disabled={hasError || isFormFilled}
                        >
                            {registerLoading ? "Checking..." : "Submit"}
                        </button>
                    </div>

                    <div className="text-right">
                        <span>
                            <Link
                                to="/"
                                className="font-medium hover:underline"
                            >
                                Log in
                            </Link>{" "}
                            if you have account
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
