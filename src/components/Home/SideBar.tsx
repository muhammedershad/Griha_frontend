import React from "react";
import { Link } from "react-router-dom";
import grihaLogo from '../../../public/images/griha logo white croped.png'

interface Props {
    close: boolean;
    setClose: (state: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ close, setClose }) => {
    return (
        <>
            <div>
                <aside
                    id="default-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${
                        close ? "hidden" : "block"
                    }`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto block bg-gray-50 dark:bg-gray-800">
                        <div className="flex h-fit justify-end w-full">
                            <button
                                className="top-3 right-3 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                onClick={() => setClose(true)}
                            >
                                <svg
                                    className="w-16 h-16"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6.707 6.293a1 1 0 0 1 1.414 0L10 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L11.414 10l1.293 1.293a1 1 0 1 1-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L8.586 10 7.293 8.707a1 1 0 0 1-.293-.707 1 1 0 0 1 .707-1.414Z" />
                                </svg>
                            </button>
                        </div>
                        <ul className="flex flex-col py-4 space-y-1">
                        <Link to="/">
                            <li className="px-5">
                                <div className="flex flex-row my-14 justify-center items-center h-8">
                                    {/* <div className="text-sm font-light tracking-wide text-gray-500">
                                    Menu
                                </div> */}
                                    <img
                                        className="w-28 h-28"
                                        src={grihaLogo}
                                        alt=""
                                    />
                                </div>
                            </li>
                        </Link>
                        <Link to="/">
                            <li>
                                <a className="relative flex flex-row text-gray-100 items-center h-14 focus:outline-none hover:bg-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-emerald-600 pr-6">
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Home
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <Link to="/project">
                            <li>
                                <a className="relative flex flex-row text-gray-100 items-center h-14 focus:outline-none hover:bg-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-emerald-600 pr-6">
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Projects
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <Link to="/About">
                            <li>
                                <a className="relative flex flex-row text-gray-100 items-center h-14 focus:outline-none hover:bg-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-emerald-600 pr-6">
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        About
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <Link to="/Contact">
                            <li>
                                <a className="relative flex flex-row text-gray-100 items-center h-14 focus:outline-none hover:bg-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-emerald-600 pr-6">
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Contact
                                    </span>
                                </a>
                            </li>
                        </Link>
                        
                    </ul>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Sidebar;
