import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Home/SideBar";

const Line = () => (
    <div className="w-[1px] h-[15px] flex align-middle mr-2 bg-orange-400"></div>
);

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [close, setClose] = useState(true);

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            // Check the scroll position and update the state accordingly
            if (window.scrollY > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Attach the scroll event listener when the component mounts
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div>
                <nav
                    className={`${
                        scrolled
                            ? "bg-black bg-opacity-70 backdrop-blur-md"
                            : " bg-black bg-opacity-70 backdrop-blur-md md:bg-transparent"
                    }  fixed w-full z-20 top-0 start-0 border-b-2 border-gray-800 md:border-0 transform translate-x-0 transition-transform duration-300 ease-in-out`}
                >
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={logo} className="h-8" alt="Griha Logo" />
                        </a>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center   dark:focus:ring-blue-800"
                                >
                                    Login
                                </button>
                            </Link>
                            <button
                                data-collapse-toggle="navbar-sticky"
                                type="button"
                                onClick={() => setClose(false)}
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-sticky"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div
                            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                            id="navbar-sticky"
                        >
                            <ul className="flex flex-col align-middle p-0 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-36 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-transparent md:dark:bg-transparent dark:border-transparent bg-opacity-0">
                                <li>
                                    <Link to="/">
                                        <a
                                            href="#"
                                            className="flex flex-row align-middle items-center py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                            aria-current="page"
                                        >
                                            <Line />
                                            Home
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex flex-row items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        <Line />
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <Link to='/project'>
                                    <a
                                        href="#"
                                        className="flex flex-row items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        <Line />
                                        About
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex flex-row items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        <Line />
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <Sidebar close={close} setClose={setClose} />
        </>
    );
}

export default Navbar;
