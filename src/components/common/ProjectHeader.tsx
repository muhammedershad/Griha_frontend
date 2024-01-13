import React, { useState } from "react";
import { project } from "../../interfaces/project";
import Input from "../common/input";

interface Props {
    project: project | null;
}

const ProjectHeader: React.FC<Props> = ({ project }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [projectName, setProjectName] = useState("");
    return (
        <>
            <div className="m-5">
                <div className="flex flex-row justify-between align-middle items-center">
                    <h2 className="text-2xl font-semibold text-stone-200 pl-5 pt-5">
                        {project?.projectName}
                    </h2>
                    {/* <SmallButton  title="Create Project" /> */}
                    <p onClick={() => setEdit(!edit)}>edit project</p>
                </div>
                <div className="pl-5 pt-8">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row w-28">
                            <p className="text-md mt-2">Project Name</p>
                            <span className="text-md mt-2">:</span>
                        </div>
                        {edit ? (
                            <p className="text-md mt-2">project value</p>
                        ) : (
                            <Input
                                state={projectName}
                                setState={setProjectName}
                            />
                        )}
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-md mt-2">Project Name</p>
                        <span>:</span>
                    </div>
                    <p className="text-md mt-2">Address </p>
                    <p className="text-md mt-2">Details </p>
                    <div className="ml-2">
                        
                        {edit ? (
                            <p className="text-md mt-2">address value</p>
                        ) : (
                            <Input
                                state={projectName}
                                setState={setProjectName}
                            />
                        )}
                        <p className="text-md mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptates quisquam a vel iure animi rem
                            deleniti dignissimos doloribus sit, sunt, veritatis
                            deserunt odit dolor vitae quasi ea molestias ducimus
                            corporis.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectHeader;
