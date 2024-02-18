import { useEffect, useState } from "react";
import UserSideBar from "../../components/user/UserSideBar";
import { ProjectPopulated } from "../../interfaces/project";
import { useParams } from "react-router-dom";
import projectApi from "../../Services/apis/projectApi";
import ProjectBody from "../../components/common/ProjectBody";
import ProjectProgress from "../../components/employee/ProjectProgress";
import Spinner from "../../components/common/Spinner";

const ProjectDetails = () => {
    const [projectDetails, setProjectDetails] = useState<ProjectPopulated>();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        (async () => {
            if (id) {
                const response = await projectApi.projectDetails(id);
                if (response.success) {
                    setProjectDetails(response.project);
                    // console.log(projectDetails);
                }
            }
        })();
    }, []);
    return (
        <>
            <UserSideBar>
                {projectDetails ? (
                    <>
                        <div className="m-5">
                            <div className="flex flex-row justify-between align-middle items-center">
                                <h2 className="text-2xl font-semibold text-stone-200 pl-5 pt-5">
                                    {projectDetails?.projectName}
                                </h2>
                            </div>
                            <div className="pl-5 pt-2">
                                <div className="flex items-center max-w-1/2 my-2">
                                    <div className="flex items-center w-32">
                                        <p className="text-md">Project Name</p>
                                        <span className="text-md mx-1">
                                            {": "}
                                        </span>
                                    </div>
                                    <p className="text-md">
                                        {projectDetails?.projectName}
                                    </p>
                                </div>

                                <div className="flex items-center max-w-1/2 my-2">
                                    <div className="flex items-center w-32">
                                        <p className="text-md">Address</p>
                                        <span className="text-md mx-1">
                                            {": "}
                                        </span>
                                    </div>
                                    <p className="text-md">{`${projectDetails?.address?.address}, ${projectDetails?.address?.district}, ${projectDetails?.address?.state}, ${projectDetails?.address?.pincode}`}</p>
                                </div>
                                <div className="flex items-center max-w-1/2 my-2">
                                    <div className="flex items-center w-32">
                                        <p className="text-md">
                                            Project Details
                                        </p>
                                        <span className="text-md mx-1">
                                            {": "}
                                        </span>
                                    </div>
                                    <p className="text-md">
                                        {projectDetails?.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ProjectBody project={projectDetails!} />
                        <ProjectProgress
                            project={projectDetails!}
                            setProject={setProjectDetails}
                            user={true} link={`/projects`}                        />
                    </>
                ) : (
                    <Spinner />
                )}
            </UserSideBar>
        </>
    );
};

export default ProjectDetails;
