import { useFormik } from "formik";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const emailRef = useRef();

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
            submitData(values);
        },
    });

    // checking errors
    const isFormFilled = Object.values(formik.values).every((el) => el === "");
    const hasError = Object.keys(formik.errors).length !== 0;

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-gray-100 p-2 xs:p-4 sm:p-8 w-full mx-2 sm:mx-auto sm:max-w-[400px]">
                <h2 className="font-bold text-gray-700 text-xl uppercase mb-5">
                    User Registration
                </h2>

                <form onSubmit={formik.handleSubmit} className="w-full">
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
                            Submit
                        </button>
                    </div>

                    <div className="text-right">
                        <span>
                            <Link
                                to="/login"
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
