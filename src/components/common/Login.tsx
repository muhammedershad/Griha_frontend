import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { validations } from "../../Services/validations";
import { Toaster, toast } from "react-hot-toast";
import LoginFormData from "../../interfaces/login";
import api from "../../Services/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Services/redux/slices/userSlice";

interface LoginProps {
    title: string;
}

const Login: React.FC<LoginProps> = ({ title }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormData>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState("");

    const submitForm = async (data: LoginFormData) => {
        if (validations.validateEmail(data?.email)) {
            toast.error("Enter a valid email");
        }

        if (data.password.trim() === "") {
            toast.error("Please a valid password");
        }

        const login = await api.login(data);
        console.log(login, "status");
        if (login.success) {
            const token = login.token;
            const user = login?.user;
            dispatch(loginSuccess({ user, token, error: false }))
            localStorage.setItem(`${title}_token`, token);
            toast.success("Login successful", { duration: 6000 });
            navigate("/dash");
        } else {
            toast.error(login.message);
        }
    };

    return (
        <div>
            <div>
                <Toaster />
            </div>
            <section className=" z-10 ">
                <div className="flex flex-col z-10 items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full z-10 rounded-lg shadow bg-transparent backdrop-blur-[300px] border-2 border-white border-opacity-10 md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-center first-letter: text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {`${title} Login `}
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit((data) => {
                                    setData(JSON.parse(JSON.stringify(data)));
                                    submitForm(data);
                                })}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
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
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                                {/* <div>
                  {Error() && (
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-red-500"
                    >
                      Incorrect email or password
                    </label>
                  )}
                </div> */}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                >
                                    Login
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't you have a account?{" "}
                                    <Link to="/signup">
                                        <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Sign Up here
                                        </span>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
