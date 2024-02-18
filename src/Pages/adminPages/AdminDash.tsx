// import React, { useEffect, useState } from "react";
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
                    <div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 py-4 gap-4">
                            {/* Recent Activities */}

                            <div className="flex flex-col">
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
                                        <p className="text-2xl"> ₹ 75,257</p>
                                        <p className="text-gray-400">
                                            Total Amount Pending
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
                                        <p className="text-2xl">3</p>
                                        <p className="text-gray-400">
                                            Total Number of Appointments
                                            Scheduled
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
                                        <p className="text-2xl">1</p>
                                        <p className="text-gray-400">
                                            Today's Appointments
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                                <div className="rounded-t mb-0 px-0 border-0">
                                    <div className="flex flex-wrap items-center px-4 py-2">
                                        <div className="relative w-full max-w-full flex-grow flex-1">
                                            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                                                Recent Activities
                                            </h3>
                                        </div>
                                        <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                            <button
                                                className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                See all
                                            </button>
                                        </div>
                                    </div>
                                    <div className="block w-full">
                                        <div className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Today
                                        </div>
                                        <ul className="my-1">
                                            <li className="flex px-4">
                                                <div className="w-9 h-9 rounded-full flex-shrink-0 bg-indigo-500 my-2 mr-3">
                                                    <svg
                                                        className="w-9 h-9 fill-current text-indigo-50"
                                                        viewBox="0 0 36 36"
                                                    >
                                                        <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                                                    <div className="flex-grow flex justify-between items-center">
                                                        <div className="self-center">
                                                            <a
                                                                className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                Nick Mark
                                                            </a>{" "}
                                                            mentioned{" "}
                                                            <a
                                                                className="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                Sara Smith
                                                            </a>{" "}
                                                            in a new post
                                                        </div>
                                                        <div className="flex-shrink-0 ml-2">
                                                            <a
                                                                className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                View
                                                                <span>
                                                                    <svg
                                                                        width={
                                                                            20
                                                                        }
                                                                        height={
                                                                            20
                                                                        }
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                        className="transform transition-transform duration-500 ease-in-out"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="flex px-4">
                                                <div className="w-9 h-9 rounded-full flex-shrink-0 bg-red-500 my-2 mr-3">
                                                    <svg
                                                        className="w-9 h-9 fill-current text-red-50"
                                                        viewBox="0 0 36 36"
                                                    >
                                                        <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                                                    <div className="flex-grow flex justify-between items-center">
                                                        <div className="self-center">
                                                            The post{" "}
                                                            <a
                                                                className="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                Post Name
                                                            </a>{" "}
                                                            was removed by{" "}
                                                            <a
                                                                className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                Nick Mark
                                                            </a>
                                                        </div>
                                                        <div className="flex-shrink-0 ml-2">
                                                            <a
                                                                className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                View
                                                                <span>
                                                                    <svg
                                                                        width={
                                                                            20
                                                                        }
                                                                        height={
                                                                            20
                                                                        }
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                        className="transform transition-transform duration-500 ease-in-out"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Yesterday
                                        </div>
                                        <ul className="my-1">
                                            <li className="flex px-4">
                                                <div className="w-9 h-9 rounded-full flex-shrink-0 bg-green-500 my-2 mr-3">
                                                    <svg
                                                        className="w-9 h-9 fill-current text-light-blue-50"
                                                        viewBox="0 0 36 36"
                                                    >
                                                        <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                                                    <div className="flex-grow flex justify-between items-center">
                                                        <div className="self-center">
                                                            <a
                                                                className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                240+
                                                            </a>{" "}
                                                            users have
                                                            subscribed to{" "}
                                                            <a
                                                                className="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                Newsletter #1
                                                            </a>
                                                        </div>
                                                        <div className="flex-shrink-0 ml-2">
                                                            <a
                                                                className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                View
                                                                <span>
                                                                    <svg
                                                                        width={
                                                                            20
                                                                        }
                                                                        height={
                                                                            20
                                                                        }
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                        className="transform transition-transform duration-500 ease-in-out"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="flex px-4">
                                                <div className="w-9 h-9 rounded-full flex-shrink-0 bg-green-500 my-2 mr-3">
                                                    <svg
                                                        className="w-9 h-9 fill-current text-light-blue-50"
                                                        viewBox="0 0 36 36"
                                                    >
                                                        <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                                                    <div className="flex-grow flex justify-between items-center">
                                                        <div className="self-center">
                                                            <a
                                                                className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                240+
                                                            </a>{" "}
                                                            users have
                                                            subscribed to{" "}
                                                            <a
                                                                className="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                Newsletter #1
                                                            </a>
                                                        </div>
                                                        <div className="flex-shrink-0 ml-2">
                                                            <a
                                                                className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                                                href="#0"
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                }}
                                                            >
                                                                View
                                                                <span>
                                                                    <svg
                                                                        width={
                                                                            20
                                                                        }
                                                                        height={
                                                                            20
                                                                        }
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                        className="transform transition-transform duration-500 ease-in-out"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainDash>
        </>
    );
};

export default AdminDash;
