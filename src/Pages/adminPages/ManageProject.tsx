import { SetStateAction, useEffect, useState } from "react";
import MainDash from "../../components/common/MainDash";
import api from "../../Services/api";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { ProjectPopulated, project } from "../../interfaces/project";
import projectApi from "../../Services/apis/projectApi";
import { Link } from "react-router-dom";
import SideHeading from "../../components/common/SideHeading";

const ManagePorject = () => {
    const [projects, setProjects] = useState<ProjectPopulated[]>([]);
    const [change, setChange] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const response = await projectApi.allPorjects();
                setProjects(response.allProjects);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchAllProjects();
    }, [change]);
    console.log(projects,'projects')

    // const filteredProjects = projects.filter((project) =>
    //     project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = filteredProjects.slice(
    //     indexOfFirstItem,
    //     indexOfLastItem
    // );

    // Change page
    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

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
                <SideHeading title={"Projects"} />
                <div className="flex gap-5 my-5">
                    <input
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        className="bg-gray-50 border w-2/6 h-10 border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by name..."
                        required
                    />
                    {/* <Link to="/admin/add-project">
                        <p className="text-sm text-center p-2 w-28 rounded-lg border-[1px]">
                            Add project
                        </p>
                    </Link> */}
                </div>

                <table className="min-w-full divide-y mb-5 divide-gray-800 overflow-x-auto rounded-3xl border-collapse">
                    <thead className="bg-gray-900 rounded-lg">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Project Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Location
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Created By
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Team Lead
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Site Area
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Action
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    {projects?.map((project) => (
                        <tbody
                            key={project?._id}
                            className="bg-gray-800 divide-y divide-gray-200"
                        >
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 object-cover"
                                                src={"https://saterdesign.com/cdn/shop/articles/SaterDesignCollectionInc-158253-Modern-House-Styles-Blogbanner1_894x.jpg?v=1653493340"}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-200">
                                                {project.projectName}
                                            </div>
                                            {/* <div className="text-sm text-gray-400">
                                                {user.Username}
                                            </div> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {project.address?.district}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {project?.postedBy?.firstName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="text-base text-gray-400">
                                        {project.team?.teamLead.firstName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="text-base text-gray-400">
                                        {'3000sq.ft'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                    <Link
                                        to={`/admin/edit-featured-project/${project?._id}`}
                                    >
                                        <a className="ml-2 text-gray-400 hover:text-gray-300">
                                            {"Edit"}
                                        </a>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                    <a
                                        // onClick={() =>
                                        //     handleChangeUserBlock(user._id)
                                        // }
                                        className="ml-2 text-gray-400 hover:text-gray-300"
                                    >
                                        {"List"}
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>

                {/* <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                /> */}
            </MainDash>
        </>
    );
};

export default ManagePorject;
