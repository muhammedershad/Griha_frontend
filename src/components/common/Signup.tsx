import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { validations } from "../../Services/validations";
import toast, { Toaster } from "react-hot-toast";
import FormData from "../../interfaces/signupInterface";
import errorObject from "../../interfaces/error";
import response from "../../interfaces/apiResponce";
import api from "../../Services/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [timer, setTimer] = useState<number>(300); // 300 seconds = 5 minutes
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if ( timer === 1) {
            setButtonDisabled(false)
        }

        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(interval); // Cleanup interval on component unmount or timer reset
    }, [isActive, timer]);

    const startTimer = () => {
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimer(300);
    };

    const checkEmail = async () => {
        console.log(email);
        if (validations.validateEmail(email)) {
            toast.error("Enter a valid email");
        } else {
            const response = await api.check_email(email);
            if (!response.success) {
                toast.error("Email already exists");
            }
        }
    };

    const checkUsername = async () => {
        console.log(username);
        if (!validations.validateUsername(username)) {
            toast.error("Enter a valid username");
        } else {
            const response = await api.check_username(username);
            console.log(response.success);
            if (!response.success) {
                return toast.error("Username already exists");
            }
        }
    };

    const formSubmit = async (data: FormData) => {
        console.log(data);
        console.log(validations.validateEmail(email));
        if (validations.validateEmail(email)) {
            toast.error("Enter a valid email");
        } else {
            const response: response = await api.check_email(email);
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

        const validateusername = validations.validateUsername(username);
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

        data.email = email;
        data.username = username;

        console.log(data, "dull data");

        const otpSend = await api.signup(data);
        if (otpSend.success) {
            toast.success(otpSend.message);
        }
        setSubmitted(true);
        startTimer();
    };

    const verify_otp = async (data: FormData) => {
        data.email = email;
        data.username = username;
        const verifyOtp = await api.verify_otp(data);
        console.log(verifyOtp);
        if (verifyOtp?.success) {
            toast.success(verifyOtp?.message, { duration: 6000 });
            navigate("/login");
        } else {
            toast.error(verifyOtp.message);
        }
    };

    const handleResendClick = async () => {
        const response = await api.resend_OTP( email )

        if ( response?.success ) {
            toast.success(response.message)
            resetTimer()
            setButtonDisabled(true)
        } else {
            toast.error( "Error in sending OTP")
        }
    }

    // const googleAuth = async () => {
    //     api.googleAuth();
    // };

    return (
        <div>
            <div>
                <Toaster />
            </div>
            <div className="flex flex-col -z-10 items-center justify-center md:mt-20 px-6 py-8 mb-8 mx-auto lg:py-0">
                <div className="w-auto md:mt-0 sm:max-w-md xl:p-0 rounded-lg shadow bg-transparent backdrop-blur-[300px] border-2 border-white border-opacity-10 flex flex-col justify-center justify-items-center">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center justify-items-center">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create a account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6 flex flex-col justify-self-center justify-center justify-items-center"
                            onSubmit={handleSubmit((data) => {
                                setData(JSON.parse(JSON.stringify(data)));
                                submitted ? verify_otp(data) : formSubmit(data);
                            })}
                        >
                            <div className="flex flex-col justify-self-center items-center gap-6 w-72">
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-white"
                                        placeholder=" "
                                        {...register("firstName")}
                                        required
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        First Name
                                    </label>
                                </div>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                        {...register("lastName")}
                                        type="text"
                                        required
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        last Name
                                    </label>
                                </div>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                        {...register("username")}
                                        type="text"
                                        onBlur={checkUsername}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Username
                                    </label>
                                </div>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                        {...register("email")}
                                        type="email"
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        onBlur={checkEmail}
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Email
                                    </label>
                                </div>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                        {...register("phone")}
                                        type="number"
                                        required
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Phone Number
                                    </label>
                                </div>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                        {...register("password")}
                                        type="password"
                                        required
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Password
                                    </label>
                                </div>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                        {...register("confirmPassword")}
                                        type="text"
                                        required
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Confirm Password
                                    </label>
                                </div>
                                {submitted && (
                                    <div>
                                        <div className="relative h-10 w-full min-w-[200px]">
                                            <input
                                                className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" "
                                                {...register("otp")}
                                                type="text"
                                                required
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                                OTP
                                            </label>
                                        </div>
                                        <small className="text-green-800 mt-4">
                                            OTP successfully sent on your
                                            verified email id. This OTP is valid
                                            for 5 minute only.
                                        </small>
                                        <div className="flex flex-row justify-between align-middle">
                                            <div className="text-white font-bold">
                                                {Math.floor(timer / 60)
                                                    .toString()
                                                    .padStart(2, "0")}
                                                :
                                                {(timer % 60)
                                                    .toString()
                                                    .padStart(2, "0")}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleResendClick}
                                                disabled={isButtonDisabled}
                                             className={`bg-gradient-to-r from-[#2d63d8] to-[#02155c] text-white text-xs px-2 py-1 rounded-md hover:bg-blue-600${
                                                isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                                              }`}>
                                                Resend OTP
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {submitted ? "Verify otp" : "Create an account"}
                            </button>
                        </form>
                        <div className="space-y-4 md:space-y-6 flex flex-col justify-self-center justify-center justify-items-center">
                            {/* <button
                                onClick={googleAuth}
                                className="w-full text-white bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Login with Google
                            </button> */}

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login">
                                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Login here
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
