import React, { useEffect, useState } from "react";
import MainDash from "../../components/common/MainDash";
import api from "../../Services/api";
import User from "../../interfaces/user";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AdminUserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [change, setChange] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await api.users();
                console.log(allUsers.users.users);
                setUsers(allUsers?.users.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [change]);

    const filteredusers = users.filter((user) =>
        user.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredusers.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChangeUserBlock = async (userId: string) => {
        // console.log(userId);
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            background: "rgb(44,48,58)",
            customClass: {
                title: "swal-text-white", // Add this class to style the title
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await api.blockUser(userId);
                // console.log(response);
                if (response?.success) {
                    toast.success(response.message);
                    setChange(!change);
                } else {
                    toast.error("Error in user role change");
                }
            } else return;
        });
    };

    const handleChangeUserRole = (userId: string) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            background: "rgb(44,48,58)",
            customClass: {
                title: "swal-text-white", // Add this class to style the title
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await api.userRoleChange(userId);
                console.log(response);
                if (response?.success) {
                    toast.success("User role changed");
                    setChange(!change);
                } else {
                    toast.error("Error in user role change");
                }
            } else return;
        });
    };

    return (
        <>
            <MainDash>
                <div className="flex justify-between items-center align-middle">
                    <h3 className="font-semibold font-sans tracking-wider m-5 text-lg">
                        Clients
                    </h3>
                    <input
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        className="bg-gray-50 border w-2/6 h-10 border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by name..."
                        required
                    />
                </div>
                <table className="min-w-full divide-y mb-5 divide-gray-800 overflow-x-auto rounded-3xl border-collapse">
                    <thead className="bg-gray-900 rounded-lg">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Role
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Phone
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {currentItems.map((user) => (
                        <tbody
                            key={user._id}
                            className="bg-gray-800 divide-y divide-gray-200"
                        >
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src="https://i.pravatar.cc/150?img=1"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-200">
                                                {user.FirstName +
                                                    " " +
                                                    user.LastName}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {user.Username}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {user.Email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {user.CreatedAt.split("T")[0]}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="text-base text-gray-400">
                                        {user.Client ? "Client" : "User"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="text-base text-gray-400">
                                        {user.Phone}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900"
                                        onClick={() =>
                                            handleChangeUserRole(user._id)
                                        }
                                    >
                                        {user.Client
                                            ? "Make User"
                                            : "Make Client"}
                                    </a>
                                    <a
                                        onClick={() =>
                                            handleChangeUserBlock(user._id)
                                        }
                                        href="#"
                                        className="ml-2 text-red-600 hover:text-red-900"
                                    >
                                        {user.IsBlocked ? "Unblock" : "Block"}
                                    </a>
                                </td>
                            </tr>
                            

                            {/* More rows... */}
                        </tbody>
                    ))}
                </table>
                <div className="pagination">
                                {Array.from({
                                    length: Math.ceil(
                                        filteredusers.length / itemsPerPage
                                    ),
                                }).map((_, index) => (
                                    <>
                                    {/* <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button> */}
                                    <a
                                    onClick={() => paginate(index + 1)}
                                    key={index + 1}
                                    className="items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index+1}</a>
                                    </>
                                ))}
                            </div>
            </MainDash>
        </>
    );
};

export default AdminUserManagement;
