import React, { useEffect, useState } from "react";
import MainDash from "../../components/common/MainDash";
import SideHeading from "../../components/common/SideHeading";
import projectApi from "../../Services/apis/projectApi";
import { featuredProjects } from "../../interfaces/featuredProject";
import { Link } from "react-router-dom";
import PaginationBar from "../../components/common/Pagination";

function FeaturedProjects() {
    const [projects, setProjects] = useState<featuredProjects[]>([]);
    const [category, setCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPage] = useState<number>(1);

    useEffect(() => {
        (async () => {
            const response = await projectApi.allFeaturedPorjects(
                category,
                searchQuery,
                currentPage
            );

            if (response) {
                setProjects(response.allFeaturedProjects);
                setTotalPage(response.totalPages);
            }
        })();
    }, [category, searchQuery, currentPage]);

    return (
        <MainDash>
            <SideHeading title={"Featured Projects"} />
            <div className="flex gap-5 my-5">
                <select
                    onChange={(event) => {
                        setCategory(event.target.value);
                    }}
                    className="peer h-full max-w-20 rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-600"
                >
                    <option className="bg-gray-600" value="all">
                        All
                    </option>
                    <option className="bg-gray-500" value="Residential">
                        Residential
                    </option>
                    <option className="bg-gray-600" value="Commercial">
                        Commercial
                    </option>
                    <option className="bg-gray-500" value="Landscape">
                        Landscape
                    </option>
                    <option className="bg-gray-600" value="Interior">
                        Interior
                    </option>
                    <option className="bg-gray-500" value="Hospitality">
                        Hospitality
                    </option>
                </select>
                <input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    className="bg-gray-50 border w-2/6 h-10 border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by name..."
                    required
                />
                <Link to="/admin/add-project">
                    <p className="text-sm text-center p-2 w-28 rounded-lg border-[1px]">
                        Add project
                    </p>
                </Link>
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
                            Client
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                            location
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                            Builtup Area
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
                {projects?.map((project: featuredProjects) => (
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
                                            src={project?.images[0]}
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
                                    {project.client}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-base text-gray-400">
                                    {project.location}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                <div className="text-base text-gray-400">
                                    {project.builtupArea}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="text-base text-gray-400">
                                    {project.siteArea}
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

            <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </MainDash>
    );
}

export default FeaturedProjects;
