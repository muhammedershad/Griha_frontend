import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import { useParams } from "react-router-dom";
import projectApi from "../../Services/apis/projectApi";
import { ProjectPopulated } from "../../interfaces/project";
import ProjectHeader from "../../components/common/ProjectHeader";
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
            <EmployeeSideBar>
                <ProjectHeader
                    project={projectDetails!}
                    setProject={setProjectDetails}
                />
                <ProjectBody project={projectDetails!} />
                <ProjectProgress
                    project={projectDetails!}
                    setProject={setProjectDetails}
                    user={false}
                    link={undefined}
                />
            </EmployeeSideBar>
        </>
    );
};

export default ProjectDetails;
