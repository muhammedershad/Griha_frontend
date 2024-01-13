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
                                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
                                        >
                                            <Link
                                                to={`/employee/project/${project._id}`}
                                            >
                                                <div className="bg-gradient-to-r from-[#355394] to-[#02155c] p-6 rounded-md cursor-pointer">
                                                    <h3 className="text-lg font-semibold">
                                                        {project.projectName}
                                                    </h3>
                                                    {/* Other content for Project 1 */}
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
