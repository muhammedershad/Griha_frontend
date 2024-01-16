import { useEffect, useState } from "react";
import UserSideBar from "../../components/user/UserSideBar";
import { project } from "../../interfaces/project";
import { useAppSelector } from "../../Services/redux/hooks";
import User from "../../interfaces/user";
import projectApi from "../../Services/apis/projectApi";
import Spinner from "../../components/common/Spinner";
import { Link } from "react-router-dom";

const UserProjects = () => {
    const [projects, setProjects] = useState<project[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUsers] = useState<User | null>(null); // Initialize with null
    const userData = useAppSelector((state) => state.user.user);
    console.log(userData,'user');
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await projectApi.userProjects(
                    userData?._id
                );
                setProjects(response.projects);
                setLoading(false);
                console.log(response,'respo');
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching employee projects:", error);
            }
        };

        if (userData) {
            setUsers(userData);
            fetchData();
        }
    }, [userData]); 

    return (
        <>
            <UserSideBar>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="p-5">
                        <div className="flex flex-row align-middle items-center">
                            <h2 className="text-2xl font-semibold text-stone-200 pl-5 pt-5">
                                Projects
                            </h2>
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
                                                to={`/project/${project._id}`}
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
            </UserSideBar>
        </>
    );
};

export default UserProjects;
