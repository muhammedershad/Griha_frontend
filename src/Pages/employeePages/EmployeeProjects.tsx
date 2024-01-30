import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import CreateProject from "../../components/employee/CreateProject";
import { useEffect, useState } from "react";
import projectApi from "../../Services/apis/projectApi";
import { useAppSelector } from "../../Services/redux/hooks";
import { project } from "../../interfaces/project";
import { Employees } from "../../interfaces/employee";
import Spinner from "../../components/common/Spinner";
import { Link } from "react-router-dom";

const EmployeeProjects = () => {
    const [projects, setProjects] = useState<project[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [employee, setEmployee] = useState<Employees | null>(null); // Initialize with null
    const employeeData = useAppSelector((state) => state.employee.employee);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await projectApi.employeeProjects(
                    employeeData?._id
                );
                setProjects(response.projects);
                setLoading(false);
                console.log(response.projects);
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching employee projects:", error);
            }
        };

        if (employeeData) {
            setEmployee(employeeData);
            fetchData();
        }
    }, [employeeData]); // Added employeeData to the dependency array

    return (
        <>
            <EmployeeSideBar>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="p-5">
                        <div className="flex flex-row justify-between align-middle items-center">
                            <h2 className="text-2xl font-semibold text-stone-200 pl-5 pt-5">
                                Projects
                            </h2>
                            {/* <SmallButton  title="Create Project" /> */}
                            <CreateProject />
                        </div>
                        <div>
                            <div className="flex flex-wrap">
                                {/* Box for Project 1 */}
                                {projects?.map((project) => {
                                    return (
                                        <div
                                            key={project._id}
                                            className="flex gap-1 p-4"
                                        >
                                            <Link
                                                to={`/employee/project/${project._id}`}
                                            >
                                                <div className="relative flex bg-clip-border rounded-xl bg-gray-900 text-gray-700 shadow-md w-full max-w-[30rem] min-w-[20rem] border-b border-red-500 border-6">
                                                    <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                                                        <img
                                                            src="https://www.shutterstock.com/image-illustration/architecture-3d-rendering-illustration-minimal-260nw-2274549397.jpg"
                                                            alt="card-image"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="p-6">
                                                        <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                                                            {
                                                                project.projectName
                                                            }
                                                        </h4>
                                                        <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-400">
                                                            Like so many
                                                            organizations these
                                                            days, Autodesk is a
                                                            company in
                                                            transition.
                                                        </p>
                                                        <a
                                                            href="#"
                                                            className="inline-block"
                                                        >
                                                            <button
                                                                className="flex items-center gap-1 px-6 py-1 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                                                                type="button"
                                                            >
                                                                Learn More
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    className="w-4 h-4"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </EmployeeSideBar>
        </>
    );
};

export default EmployeeProjects;
