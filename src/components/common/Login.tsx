import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validations } from "../../Services/validations";
import { Toaster, toast } from "react-hot-toast";
import LoginFormData from "../../interfaces/login";
// import api from "../../Services/api";
import User from "../../interfaces/user";
import { userloginSuccess } from "../../Services/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { employeeloginSuccess } from "../../Services/redux/slices/employeeSlice";
import { adminloginSuccess } from "../../Services/redux/slices/adminSlice";

interface UserLoginProps {
    navigateTo: string;
    title: string;
    loginFn: (data: LoginFormData) => Promise<{
        success: boolean;
        message: string;
        token: string;
        user: User;
    }>;
}

const Login: React.FC<UserLoginProps> = ({ title, loginFn, navigateTo }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormData>();
    // const [data, setData] = useState("");

    const submitForm = async (data: LoginFormData) => {
        if (validations.validateEmail(data?.email)) {
            toast.error("Enter a valid email");
        }

        if (data.password.trim() === "") {
            toast.error("Please a valid password");
        }

        const login = await loginFn(data);
        // console.log(login, "status");
        if (login.success) {
            const token = login.token;
            const user = login?.user;
            if (title === "User") {
                dispatch(
                    userloginSuccess({ user: user, token: token, error: false })
                );
            } else if (title === "Employee") {
                dispatch(
                    employeeloginSuccess({
                        employee: user,
                        token: token,
                        error: false,
                    })
                );
            } else if (title === "Admin") {
                dispatch(
                    adminloginSuccess({
                        admin: user,
                        token: token,
                        error: false,
                    })
                );
            }

            localStorage.setItem(`${title}_token`, token);
            toast.success("Login successful", { duration: 6000 });
            navigate(navigateTo);
        } else {
            toast.error(login.message);
        }
    };

    return (
        <div>
            <div>
                <Toaster />
            </div>
            <section className=" z-0 ">
                <div className="flex flex-col z-0 items-center justify-center align-super px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full z-10 rounded-lg shadow bg-transparent backdrop-blur-[300px] border-2 border-white border-opacity-10 md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-center first-letter: text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                {`${title} Login `}
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit((data) => {
                                    // setData(JSON.parse(JSON.stringify(data)));
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
                                        className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                        className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
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
                                {
                                    title === 'Employee' && <>
                                    <hr className=" border-gray-600" />
                                    <div className="text-gray-400 text-center">
                                        <p>Demo User</p>
                                        <p>Email: muhammedershadp@gmail.com</p>
                                        <p>password: 123456</p>
                                    </div>
                                </>
                                }
                                {
                                    title === 'Admin' && <>
                                    <hr className=" border-gray-600" />
                                    <div className="text-gray-400 text-center">
                                        <p>Demo User</p>
                                        <p>Email: admin@example.com</p>
                                        <p>password: 123456</p>
                                    </div>
                                </>
                                }
                                
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
