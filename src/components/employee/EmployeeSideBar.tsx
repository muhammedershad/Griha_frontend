import React, { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import api from "../../Services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Services/redux/hooks";
import { employeeApi } from "../../Services/employeeApi";
import {
    employeeloginSuccess,
    employeelogout,
} from "../../Services/redux/slices/employeeSlice";
import grihaLogo from "../../../public/images/griha logo white croped.png";

interface ResponsiveLayoutProps {
    children: ReactNode;
}

const EmployeeSideBar: React.FC<ResponsiveLayoutProps> = ({ children }) => {
    const employee = useAppSelector((state) => state.employee.employee);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const savedToken = localStorage.getItem("Employee_token");
        // console.log(savedToken,'savedToken');
        // console.log(employee,)
        if (savedToken && !employee) {
            const updateSlice = async () => {
                const response = await employeeApi.UpdateSlice(savedToken);
                //  console.log(response );
                if (response?.success) {
                    dispatch(
                        employeeloginSuccess({
                            employee: response.employee,
                            token: savedToken,
                            error: false,
                        })
                    );
                } else {
                    logout();
                }
            };
            updateSlice();
        }
    });

    const navigate = useNavigate();

    const logout = async () => {
        api.adminLogout();
        localStorage.removeItem("Employee_token");
        dispatch(employeelogout());
        navigate("/employee/login");
    };
    return (
        <div className="flex h-screen bg-[#131417]">
            <div>
                <Toaster />
            </div>
            {/* Sidebar (hidden on medium screens and below) */}
            <div className="hidden md:flex md:w-1/5  m-4 rounded-lg bg-[#2c303a] text-white px-2 pr-0">
                {/* Sidebar content goes here */}

                <div className="overflow-y-auto overflow-x-hidden flex-grow">
                    <ul className="flex flex-col py-4 space-y-1">
                        <Link to="/employee/dash">
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
                        <Link to="/employee/dash">
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
                                        Dashboard
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <Link to="/employee/meetings">
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
                                        Appoinments
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <Link to="/employee/projects">
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
                                        Projects
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <Link to="/employee/tasks">
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
                                        Tasks
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <Link to="/employee/messages">
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
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Messages
                                    </span>
                                </a>
                            </li>
                        </Link>
                        {/* <li className="px-5">
                            <div className="flex flex-row items-center h-8">
                                <div className="text-sm font-light tracking-wide text-gray-500">
                                    Tasks
                                </div>
                            </div>
                        </li> */}
                        {/* <Link to="/employee/payments">
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
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Payments
                                    </span>
                                </a>
                            </li>
                        </Link> */}
                        {/* <Link to="/users">
                            <li>
                                <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
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
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                       Profile
                                    </span>
                                </a>
                            </li>
                        </Link> */}
                        {/* <Link to="/admin/employee">
                            <li>
                                <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
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
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Employees
                                    </span>
                                </a>
                            </li>
                        </Link>
                        <li className="px-5">
                            <div className="flex flex-row items-center h-8">
                                <div className="text-sm font-light tracking-wide text-gray-500">
                                    Settings
                                </div>
                            </div>
                        </li> */}
                        <Link to="/employee/profile">
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
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Profile
                                    </span>
                                </a>
                            </li>
                        </Link>
                        {/* <li>
                            <a
                                href="#"
                                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                            >
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
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">
                                    Settings
                                </span>
                            </a>
                        </li> */}
                        <li>
                            <a
                                onClick={logout}
                                className="relative flex flex-row text-gray-100 items-center h-14 focus:outline-none hover:bg-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-emerald-600 pr-6"
                            >
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
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">
                                    Logout
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main section */}
            <div className="w-full flex-grow overflow-y-auto overflow-hidden md:m-5 m-3 md:ml-0 rounded-lg bg-[#2c303a] text-white">
                {/* Main content goes here */}
                {children}
            </div>
        </div>
    );
};

export default EmployeeSideBar;
