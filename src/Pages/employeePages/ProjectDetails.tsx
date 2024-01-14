import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import { useParams } from "react-router-dom";
import projectApi from "../../Services/apis/projectApi";
import { project } from "../../interfaces/project";
import ProjectHeader from "../../components/common/ProjectHeader";

const ProjectDetails = () => {
    const [projectDetails, setProjectDetails] = useState<project | null>(null);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        (async () => {
            if (id) {
                const response = await projectApi.projectDetails(id);
                if (response.success) {
                    setProjectDetails(response.project);
                }
            }
        })();
    }, []);

    return (
        <>
            <EmployeeSideBar>
                <ProjectHeader project={projectDetails} setProject={setProjectDetails} />

            </EmployeeSideBar>
        </>
    );
};

export default ProjectDetails;
