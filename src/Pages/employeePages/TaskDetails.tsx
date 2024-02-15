import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import { useParams } from "react-router-dom";
import tasksApi from "../../Services/apis/tasks.api";
import { TaskPopulated } from "../../interfaces/taks";
import Comments from "../../components/common/Comments";
import UsersProfileCard from "../../components/common/UsersProfileCard";
import Spinner from "../../components/common/Spinner";
import getMetaData from "../../Services/firebase/metaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import downlaodFiles from "../../Services/firebase/downloadFiles";
import DragDrop from "../../components/common/DragAndDrop";
import toast from "react-hot-toast";
import uploadOtherFilesToFirebase from "../../Services/firebase/otherFiles";
import { useAppSelector } from "../../Services/redux/hooks";

interface AttachmentMetaData {
    name: string;
    // Define properties based on your metadata structure
    // Example properties:
    url: string;
    size: number;
    type: string;
    // ... other properties
}

function TaskDetails() {
    const [task, setTask] = useState<TaskPopulated>();
    const { taskId } = useParams<string>();
    const [metaData, setMetaData] = useState<AttachmentMetaData[]>([]);
    const [files, setFiles] = useState<(Blob | MediaSource)[]>([]);
    const [details, setDetails] = useState<string>("");
    const employeeData = useAppSelector((state) => state.employee.employee);
    const [comment, setComment] = useState<string>("");

    useEffect(() => {
        (async () => {
            const response = await tasksApi.taskDetails(taskId!);
            if (response.success) {
                setTask(response?.task);
                const arr = response.task.attachments.map(
                    async (url: string) => await getMetaData(url)
                );
                Promise.all(arr)
                    .then((results) => {
                        for (let i = 0; i < results.length; i++) {
                            results[i].url = response.task.attachments[i];
                        }
                        setMetaData(results);
                    })
                    .catch((error) => {
                        console.error("Error fetching metadata:", error);
                    });
            }
        })();
    }, [taskId]);

    const handleDownload = async (url: string, name: string) => {
        downlaodFiles(url, name);
    };

    const handleSubmit = async () => {
        if (!details.trim()) return toast.error("Enter details");
        let fileUrls: any = [];
        if (files.length > 0) {
            fileUrls = await uploadOtherFilesToFirebase(
                files,
                "tasks_attachments/"
            );
            if (!fileUrls) return toast.error("Error in uploadin files");
        }
        const data = {
            taskId,
            details,
            attachments: fileUrls,
            user: employeeData?._id,
        };
        const response = await tasksApi.addResponse(data);
        console.log(response);
        if (response?.success) {
            toast.success(response.message);
            setTask(response?.response);
            setDetails("");
            setFiles([]);
        }
    };

    const handleComment = async () => {
        const data = {
            taskId,
            comment,
            user: employeeData?._id,
        };
        const response = await tasksApi.addCommad(data);
        if (response.success) {
            toast.success(response.message);
            setComment("");
            setTask(response.task);
        }
    };

    return (
        <EmployeeSideBar>
            {!task ? (
                <Spinner />
            ) : (
                <div className="p-10">
                    <h3 className="text-gray-200 text-xl font-bold">
                        {task?.taskName}
                    </h3>
                    <div className="text-sm flex my-2 text-gray-300 gap-5">
                        <p>Assigned Date: 16/0/23</p>
                        <p>Due Date: 15/02/23</p>
                    </div>
                    <div className="flex gap-5">
                        <div className="col-12 md:w-2/3 my-5 ">
                            <div className="">
                                <div className="flex flex-col p-5 rounded-md mb-5 bg-slate-800">
                                    <div className="flex flex-row">
                                        <div className="flex flex-row w-1/2 items-center">
                                            <p className=" text-gray-200 mb-3 mr-3">
                                                Project:
                                            </p>
                                            <p className=" text-gray-200 bg-slate-700 mb-3 p-1 rounded-md">
                                                {task.project?.projectName}
                                            </p>
                                        </div>
                                        <div className="flex items-center w-1/2">
                                            <p className=" text-gray-200 mb-3 mr-3">
                                                Department:
                                            </p>
                                            <p className=" text-gray-200 bg-slate-700 mb-3 p-1 rounded-md">
                                                {task.department}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex flex-row items-center w-1/2">
                                            <p className=" text-gray-200 mb-3 mr-3">
                                                Priority:
                                            </p>
                                            <p className="text-lg text-gray-200 bg-slate-700 mb-3 p-1 rounded-md">
                                                {task.priority}
                                            </p>
                                        </div>
                                        <div className="flex items-center w-1/2">
                                            <p className="text-lg text-gray-200 mb-3 mr-3">
                                                Status:
                                            </p>
                                            <p className="text-lg text-gray-200 bg-slate-700 mb-3 p-1 rounded-md">
                                                {task.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg text-gray-200 mb-3">
                                            Task Details
                                        </p>
                                        <p className=" text-gray-300 mb-5">
                                            {task?.details}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full my-4 flex-col bg-slate-700 rounded-md p-5">
                                    <p className="text-lg text-gray-200 mb-3">
                                        Assigned By
                                    </p>

                                    <div className=" mb-5">
                                        <UsersProfileCard
                                            user={task?.assignedBy}
                                            selectedUsers={[]}
                                            onUserSelect={undefined}
                                            edit={false}
                                        />
                                    </div>
                                    <p className="text-lg text-gray-200 mb-3">
                                        Assigned To
                                    </p>
                                    <div className=" mb-5">
                                        <UsersProfileCard
                                            user={task?.assignedTo}
                                            selectedUsers={[]}
                                            onUserSelect={undefined}
                                            edit={false}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-200 mb-3">
                                        Attachments
                                    </p>
                                    {metaData.map((attachment) => (
                                        <div className="bg-slate-700 flex justify-between text-gray-300 mb-2 p-4 rounded-md">
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faPaperclip}
                                                />
                                                <span className="mx-3 ">
                                                    {attachment?.name}
                                                </span>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleDownload(
                                                        attachment?.url,
                                                        attachment?.name
                                                    )
                                                }
                                                className="hover:text-gray-50 cursor-pointer"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {task.status === "active" &&
                                    employeeData?._id ===
                                        task?.assignedTo?._id && (
                                        <div className="flex w-full flex-col items-center bg-slate-800 rounded-md p-5">
                                            <p className="text-lg text-gray-200 mb-3">
                                                Response
                                            </p>
                                            <div className="relative w-full min-w-[200px]">
                                                <textarea
                                                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:bg-gray-600"
                                                    placeholder=" "
                                                    value={details}
                                                    onChange={(e) =>
                                                        setDetails(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                                    Detials
                                                </label>
                                            </div>
                                            <div className="my-4">
                                                <DragDrop
                                                    files={files}
                                                    setFiles={setFiles}
                                                />
                                            </div>
                                            <button
                                                onClick={handleSubmit}
                                                className="bg-slate-700 max-w-[400px] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                                            >
                                                {"Submit Response"}
                                            </button>
                                        </div>
                                    )}
                                <div className="flex w-full my-4 flex-col bg-slate-700 rounded-md p-5">
                                    <p className="text-lg text-gray-200 mb-3">
                                        Responses
                                    </p>
                                    <div>
                                        <p className="text-lg text-gray-200 mb-3">
                                            Submitted By
                                        </p>
                                        <div className=" mb-5">
                                            <UsersProfileCard
                                                user={task?.assignedTo}
                                                selectedUsers={[]}
                                                onUserSelect={undefined}
                                                edit={false}
                                            />
                                        </div>
                                        <p className="text-lg text-gray-200 mb-3">
                                            Details
                                        </p>
                                        <p className=" text-gray-300 mb-5">
                                            {task?.response[0]?.details}
                                        </p>
                                        <p className="text-lg text-gray-200 mb-3">
                                            Attachments
                                        </p>
                                        {metaData.map((attachment) => (
                                            <div className="bg-slate-800 flex justify-between text-gray-300 mb-2 p-4 rounded-md">
                                                <div>
                                                    <FontAwesomeIcon
                                                        icon={faPaperclip}
                                                    />
                                                    <span className="mx-3 ">
                                                        {attachment?.name}
                                                    </span>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        handleDownload(
                                                            attachment?.url,
                                                            attachment?.name
                                                        )
                                                    }
                                                    className="hover:text-gray-50 cursor-pointer"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faDownload}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 md:w-1/3 bg-slate-800 p-5 rounded-md my-5">
                            <p className="text-lg text-gray-200 mb-3">
                                Comments
                            </p>
                            <div className="relative my-5">
                                <input
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    id="search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Leave a comment"
                                    required
                                />
                                <button
                                    onClick={handleComment}
                                    disabled={comment.trim() === ""}
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 disabled:opacity-30 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Post
                                </button>
                            </div>
                            <Comments comments={task?.comments} />
                        </div>
                    </div>
                </div>
            )}
        </EmployeeSideBar>
    );
}

export default TaskDetails;
