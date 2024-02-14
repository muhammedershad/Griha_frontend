import React, { useEffect, useState } from "react";
import UserSideBar from "../../components/user/UserSideBar";
import ProjectHeader from "../../components/common/ProjectHeader";
import { Project, ProjectPopulated } from "../../interfaces/project";
import { useParams } from "react-router-dom";
import projectApi from "../../Services/apis/projectApi";
import ProjectBody from "../../components/common/ProjectBody";
import ProjectProgress from "../../components/employee/ProjectProgress";

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
                <ProjectHeader
                    project={projectDetails!}
                    setProject={setProjectDetails}
                />
                <ProjectBody project={projectDetails!} />
                <ProjectProgress
                    project={projectDetails!}
                    setProject={setProjectDetails}
                    user={true}
                />
            </UserSideBar>
        </>
    );
};

export default ProjectDetails;
