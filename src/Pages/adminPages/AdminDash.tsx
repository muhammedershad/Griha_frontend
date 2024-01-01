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
                <h3 className="font-semibold font-sans tracking-wider m-5 text-lg">
                    Admin Dash
                </h3>
                
            </MainDash>
        </>
    );
};

export default AdminDash;
