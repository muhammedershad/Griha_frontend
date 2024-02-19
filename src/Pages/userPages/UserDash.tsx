import AreaChartFor from "../../components/common/Chart";
import UserSideBar from "../../components/user/UserSideBar";

const UserDash = () => {
    return (
        <>
            <UserSideBar>
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
                                        <p className="text-2xl"> ₹ 10000</p>
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
                            <div>
                                <p className=" text-sm font-bold text-gray-300">
                                    Project Status
                                </p>
                                <div className="items-center w-full flex">
                                <AreaChartFor />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UserSideBar>
        </>
    );
};

export default UserDash;
