import { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
    const emailRef = useRef();
    const messageRef = useRef();

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
    const handleLogin = (e) => {};
    // checking errors
    const isFormFilled = Object.values(formik.values).every((el) => el === "");
    const hasError = Object.keys(formik.errors).length !== 0;

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-gray-100 p-2 xs:p-4 sm:p-8 w-full mx-2 sm:mx-auto sm:max-w-[400px]">
                <h2 className="font-bold text-gray-700 text-xl uppercase mb-5">
                    User Login
                </h2>

                <form onSubmit={formik.handleSubmit} className="w-full">
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
                            disabled={isFormFilled || hasError}
                        >
                            <span>Submit</span>
                        </button>
                    </div>
                </form>

                <div className="text-right">
                    <span>
                        <Link to="/" className="font-medium hover:underline">
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
