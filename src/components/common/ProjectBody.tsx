import React, { useEffect, useState } from "react";
import MembersList from "./MembersList";
import { Spinner } from "flowbite-react";
import { ProjectPopulated } from "../../interfaces/project";

interface Props {
    project: ProjectPopulated;
}

const ProjectBody: React.FC<Props> = ({ project }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (project) {
            // console.log(project);
            setLoading(false);
        }
    }, [project]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col md:flex-row w-full md:p-5 gap-5">
                    <div className="sm:w-full md:w-1/2">
                        <MembersList
                            users={project?.clients}
                            edit={false}
                            heading={"Clients"}
                            selectedUsers={[]}
                        />
                    </div>
                    <div className="sm:w-full md:w-1/2">
                        <MembersList
                            users={project?.team?.members}
                            // selectedUsers={project?.team?.members}
                            edit={false}
                            heading={"Team Members"}
                            selectedUsers={[]}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectBody;
