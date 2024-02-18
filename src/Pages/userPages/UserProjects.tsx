import { useEffect, useState } from "react";
import UserSideBar from "../../components/user/UserSideBar";
import { Project } from "../../interfaces/project";
import { useAppSelector } from "../../Services/redux/hooks";
import projectApi from "../../Services/apis/projectApi";
import Spinner from "../../components/common/Spinner";
import { Link } from "react-router-dom";
import image from "../../../public/images/Shrug-bro.png";

const UserProjects = () => {
    const [projects, setProjects] = useState<Project[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const userData = useAppSelector((state) => state.user.user);
    // console.log(userData, "user");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await projectApi.userProjects(userData?._id!);
                setProjects(response.projects);
                setLoading(false);
                console.log(response, "respo");
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching employee projects:", error);
            }
        };

        if (userData) {
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
                        <div className="flex flex-row w-full h-full align-middle items-center">
                            <h2 className="text-2xl font-semibold text-stone-200 pl-5 pt-5">
                                Projects
                            </h2>
                        </div>
                        <div>
                            {projects && projects?.length > 0 ? (
                                <div className="flex flex-wrap">
                                    {projects?.map((project) => {
                                        return (
                                            <div
                                            key={project._id}
                                            className="flex z-0 gap-1 p-4"
                                        >
                                            <Link
                                                to={`/projects/${project._id}`}
                                            >
                                                <div className=" z-0 flex bg-clip-border rounded-xl bg-gray-900 text-gray-700 shadow-md w-full max-w-[30rem] min-w-[20rem] border-b border-red-500 border-6">
                                                    <div className=" w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                                                        <img
                                                            src="https://www.shutterstock.com/image-illustration/architecture-3d-rendering-illustration-minimal-260nw-2274549397.jpg"
                                                            alt="card-image"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="p-6">
                                                        <h4 className=" mb-2 font-sans text-2xl font-semibold text-gray-400">
                                                            {
                                                                project.projectName
                                                            }
                                                        </h4>
                                                        <p className=" mb-8 font-sans text-base font-normal text-gray-400">
                                                            Like so many
                                                            organizations these
                                                            days, Autodesk is a
                                                            company in
                                                            transition.
                                                        </p>
                                                        <a className="">
                                                            <button
                                                                className="flex items-center gap-1 px-6 py-1 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                                                                type="button"
                                                            >
                                                                More Details
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className=" flex flex-col justify-center items-center m-4">
                                    <img
                                        src={image}
                                        alt="Project Image"
                                        className="max-w-full w-[30%] h-auto rounded-md"
                                    />
                                    <p className="mt-4 text-lg text-gray-400">
                                        Currently, no projects are available.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </UserSideBar>
        </>
    );
};

export default UserProjects;
