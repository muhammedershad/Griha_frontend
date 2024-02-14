import { useForm } from "react-hook-form";
import { useState } from "react";
import { validations } from "../../Services/validations";
import toast, { Toaster } from "react-hot-toast";
import FormData from "../../interfaces/signupInterface";
import errorObject from "../../interfaces/error";
import response from "../../interfaces/apiResponce";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const formSubmit = async (data: FormData) => {
        console.log(data);
        if (validations.validateEmail(data?.email)) {
            toast.error("Enter a valid email");
        } else {
            const response: response = await api.userExistsCheck(data?.email);
            if (!response?.success) {
                return toast.error("Eamil id already exists");
            }
        }

        if (
            validations.validateFirstNameAndSecondName(
                data?.firstName,
                data?.lastName
            )
        ) {
            toast.error("Enter a valid first or last name");
        }

        const validateusername = validations.validateUsername(data?.username);
        if (validateusername?.error) {
            toast.error(validateusername?.message);
        }

        const res: errorObject = validations.validatePassword(
            data?.password,
            data?.confirmPassword
        );
        if (res?.error) {
            toast.error(res.message, {
                style: { background: "#2c3142", color: "white" },
            });
        }

        const otpSend = await api.signup(data);
        if (otpSend.success) {
            toast.success(otpSend.message);
        }
        setSubmitted(true);
    };

    const verify_otp = async (data: FormData) => {
        console.log(data);
        const verifyOtp = await api.verify_otp(data);
        if (verifyOtp?.success) {
            toast.success(verifyOtp?.message, { duration: 6000 });
            navigate("/login");
        } else {
            toast.error(verifyOtp.message);
        }
    };

    return (
        <div>
            <div>
                <Toaster />
            </div>
            <div className="flex flex-col items-center justify-center md:mt-20 px-6 py-8 mb-8 mx-auto lg:py-0">
                <div className="w-full md:mt-0 sm:max-w-md xl:p-0 rounded-lg shadow bg-transparent backdrop-blur-[300px] border-2 border-white border-opacity-10">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create a account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit((data) => {
                                setData(JSON.parse(JSON.stringify(data)));
                                submitted ? verify_otp(data) : formSubmit(data);
                            })}
                        >
                            <div className="flex flex-row justify-between">
                                <div className="lg:col-6">
                                    <label
                                        htmlFor="firstName"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="firstName"
                                        id="firstName"
                                        {...register("firstName")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div className="lg:col-6">
                                    <label
                                        htmlFor="lastName"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="lastName"
                                        id="lastName"
                                        {...register("lastName")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    User Name
                                </label>
                                <input
                                    type="username"
                                    {...register("username")}
                                    id="username"
                                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your phone number
                                </label>
                                <input
                                    type="phone"
                                    id="phone"
                                    {...register("phone")}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="9752356985"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="confirm-password"
                                    {...register("confirmPassword")}
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            {submitted && (
                                <div>
                                    <label
                                        htmlFor="otp"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Enter otp
                                    </label>
                                    <input
                                        type="otp"
                                        {...register("otp")}
                                        id="otp"
                                        placeholder="1234"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full text-white bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {submitted ? "Verify otp" : "Create an account"}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
