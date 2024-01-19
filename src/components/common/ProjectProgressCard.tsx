import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { project } from "../../interfaces/project";
import React from "react";

interface Props {
    progress: project['progress']
}

const ProjectProgressCard: React.FC<Props> = ({ progress }) => {
    return (
        <>
            <div className="flex w-full max-w-lg sm:my-2 md:my-0 bg-slate-800 justify-between rounded-md p-5">
                <div className="">
                    <h3 className="text-white mb-2 text-left font-semibold text-lg">
                        {`Task: ${progress?.title}`}
                    </h3>
                    <h5 className="text-gray-300">
                        {`${progress?.shortDiscription}`}
                    </h5>
                    <div className="my-2 text-slate-500 flex">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faFlag} />
                            <p className="mx-2">{progress?.date.split("T")[0]}</p>
                        </div>
                        <div className="mx-2 flex items-center">
                            <FontAwesomeIcon icon={faComment} />
                            <p className="mx-2">16</p>
                        </div>
                        <div className="mx-2 flex items-center">
                            <FontAwesomeIcon icon={faFileAlt} />
                            <p className="mx-2">{progress?.imageUrls.length + progress?.videoUrls.length + progress?.otherFileUrls.length}</p>
                        </div>
                    </div>
                </div>
                <div className="min-w-fit">
                    <img
                        className="h-10 w-10 object-cover object-center bg-slate-50 rounded-full"
                        src={progress?.postedBy?.image || "https://cdn4.iconfinder.com/data/icons/gamer-player-3d-avatars-3d-illustration-pack/512/19_Man_T-Shirt_Suit.png"}
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default ProjectProgressCard;