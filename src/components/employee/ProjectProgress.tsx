import React from "react";
import ProjectProgressCard from "../common/ProjectProgressCard";
import ProjectProgressHeader from "./ProjectProgressHeader";
import { project } from "../../interfaces/project";
import { progress } from "@material-tailwind/react";

interface Props {
    project: project
    setProject: (project: project) => void
    user: boolean
}
const ProjectProgress: React.FC<Props> = ({project, setProject, user}) => {
    return (
        <>
            <div className="bg-slate-200 md:m-6 my-4 bg-gradient-to-b from-slate-500 to-slate-800 shadow-lg rounded-lg p-3">
                <ProjectProgressHeader project={project} setProject={setProject} user={user} />
                <div className="flex justify-center items-center w-full">
                    <div className="w-fit flex max-h-[410px] overflow-y-scroll flex-wrap items-center gap-4">
                        {
                            project?.progress?.map((progress) => <ProjectProgressCard progress={progress} projectId={project?._id} />)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectProgress;
