import React, { useEffect, useState } from "react";
import MembersList from "./MembersList";
import { project } from "../../interfaces/project";
import { Spinner } from "flowbite-react";

interface Props {
    project: project | null;
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
                            selectedUsers={project?.clients}
                            onUserSelect={undefined}
                            edit={false}
                            heading={"Clients"}
                        />
                    </div>
                    <div className="sm:w-full md:w-1/2">
                        <MembersList
                            users={project?.team?.members}
                            selectedUsers={project?.team?.members}
                            onUserSelect={undefined}
                            edit={false}
                            heading={"Team Members"}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectBody;
