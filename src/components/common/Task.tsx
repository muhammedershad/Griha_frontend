import {
    faComment,
    faFileAlt,
    faFlag,
    faFolder,
    faFolderOpen,
    faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Tasks } from "../../interfaces/taks";
import { Link } from "react-router-dom";

interface Prop {
    task: Tasks;
}

const Task: React.FC<Prop> = ({ task }) => {
    const dateObject = new Date(task?.dueDate);
    const formattedDate = dateObject.toDateString();
    return (
        <div>
            <Link to={`/employee/task/${task._id}`}>
            <a className="relative bg-gray-900 block px-6 border border-gray-600 rounded-lg max-w-sm mx-auto my-3">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
                <div className="my-4">
                    <div className="flex justify-between items-center gap-2">
                        <h2 className="text-gray-400 text-xl font-semibold">
                            {task.taskName}
                        </h2>
                        <button className="bg-green-900 h-fit text-gray-300 text-[12px] inline-block py-1 px-2 rounded leading-none">
                            {task.priority || "HIGH"}
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                        <p className="bg-gray-800 h-fit text-gray-400 text-sm inline-block py-1 px-2 rounded leading-none">
                            {task?.project?.projectName || "Project"}
                        </p>
                        <p className="bg-gray-800 h-fit text-red-700 text-sm inline-block py-1 px-2 rounded leading-none">
                            {"Due: " + formattedDate}
                        </p>
                    </div>
                    <p className="text-gray-500 mt-2 text-base">
                        {task.shortDescription}
                    </p>
                </div>
                <div className="flex mb-5">
                    <div className=" text-base text-slate-500 flex">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faFlag} />
                            <p className="mx-2">{"test"}</p>
                        </div>
                        <div className="mx-2 flex items-center">
                            <FontAwesomeIcon icon={faComment} />
                            <p className="mx-2">16</p>
                        </div>
                        <div className="mx-2 flex items-center">
                            <FontAwesomeIcon icon={faFileAlt} />
                            <p className="mx-2">{"sdfasld"}</p>
                        </div>
                    </div>
                    {/* <button className="px-2 py-1 mb-5 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800">
                        Click Me
                    </button> */}
                </div>
            </a>
            </Link>
        </div>
    );
};

export default Task;
