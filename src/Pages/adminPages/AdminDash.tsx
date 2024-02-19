// import React, { useEffect, useState } from "react";
import IncomeChart from "../../components/IcomeChart";
import MainDash from "../../components/common/MainDash";
// import api from "../../Services/api";
// import User from "../../interfaces/user";
// import Swal from "sweetalert2";
// import toast from "react-hot-toast";

const AdminDash = () => {
    // const [users, setUsers] = useState<User[]>([]);
    // const [change, setChange] = useState(true)
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const allUsers = await api.users();
    //             console.log(allUsers.users.users);
    //             setUsers(allUsers?.users.users);
    //         } catch (error) {
    //             console.error("Error fetching users:", error);
    //         }
    //     };

    //     fetchUsers();
    // }, [change]);

    // const handleChangeUserBlock = async (userId: string) => {
    //     // console.log(userId);
    //     Swal.fire({
    //         title: "Are you sure?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes",
    //         background: "rgb(44,48,58)",
    //         customClass: {
    //             title: "swal-text-white", // Add this class to style the title
    //         },
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             const response = await api.blockUser(userId);
    //             // console.log(response);
    //             if ( response?.success) {
    //                 toast.success(response.message)
    //                 setChange(!change)
    //             } else {
    //                 toast.error("Error in user role change")
    //             }
    //         } else return;
    //     });
    // };

    // const handleChangeUserRole = (userId: string) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes",
    //         background: "rgb(44,48,58)",
    //         customClass: {
    //             title: "swal-text-white", // Add this class to style the title
    //         },
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             const response = await api.userRoleChange(userId);
    //             console.log(response);
    //             if ( response?.success) {
    //                 toast.success("User role changed")
    //                 setChange(!change)
    //             } else {
    //                 toast.error("Error in user role change")
    //             }
    //         } else return;
    //     });
    // };

    return (
        <>
            <MainDash>
                <div className="mx-auto p-10 grid max-w-screen-lg px-1 pb-10">
                    <div className="w-full">
                        <p className=" text-xl mb-5 font-bold text-gray-300">
                            Dashboard
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 gap-4">
                            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                    <svg
                                        width={30}
                                        height={30}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h8l2 2 2-2h1a2 2 0 002-2V5a2 2 0 00-2-2zM10 9H8m0 4h2m7-4h2m0 4h-2m-3-3v6m0 0l-3-3 3-3z"
                                        />
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl">3</p>
                                    <p className="text-gray-400">
                                        Total Projects
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                    <svg
                                        width={30}
                                        height={30}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl">3</p>
                                    <p className="text-gray-400">
                                        Ongoing Project
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                    <svg
                                        width={30}
                                        height={30}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="stroke-current text-green-600 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl">0</p>
                                    <p className="text-gray-400">
                                        Completed Projects
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                    <svg
                                        width={30}
                                        height={30}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="stroke-current text-red-600 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl">0</p>
                                    <p className="text-gray-400">
                                        Cancelled Projects
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                            {/* Recent Activities */}

                            <div className="bg-blue-500 mb-5 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-green-600 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                                    >
                                        <line
                                            x1="12"
                                            y1="1"
                                            x2="12"
                                            y2="23"
                                        ></line>
                                        <line
                                            x1="17"
                                            y1="5"
                                            x2="7"
                                            y2="5"
                                        ></line>
                                        <line
                                            x1="17"
                                            y1="12"
                                            x2="7"
                                            y2="12"
                                        ></line>
                                        <line
                                            x1="17"
                                            y1="19"
                                            x2="7"
                                            y2="19"
                                        ></line>
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl"> ₹ 15000</p>
                                    <p className="text-gray-400">
                                        Total Revenue
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-500 mb-5 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-blue-600 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                                    >
                                        <rect
                                            x="3"
                                            y="4"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="16"
                                            y1="2"
                                            x2="16"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="8"
                                            y1="2"
                                            x2="8"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="3"
                                            y1="10"
                                            x2="21"
                                            y2="10"
                                        ></line>
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl">₹ 5000</p>
                                    <p className="text-gray-400">
                                        Total Expenses
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-500 mb-5 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-blue-600 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                                    >
                                        <rect
                                            x="3"
                                            y="4"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="16"
                                            y1="2"
                                            x2="16"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="8"
                                            y1="2"
                                            x2="8"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="3"
                                            y1="10"
                                            x2="21"
                                            y2="10"
                                        ></line>
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl">₹ 1000</p>
                                    <p className="text-gray-400">
                                        Total Profit
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className=" text-sm text-center font-bold text-gray-300">
                                    Income Per Month
                                </p>
                        <IncomeChart />
                    </div>
                </div>
            </MainDash>
        </>
    );
};

export default AdminDash;
