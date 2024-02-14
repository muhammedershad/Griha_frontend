import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import { ProjectProgressPopulated, Project } from "../../interfaces/project";
import { useParams } from "react-router-dom";
import projectApi from "../../Services/apis/projectApi";
import toast from "react-hot-toast";
import { useAppSelector } from "../../Services/redux/hooks";
import Comments from "../../components/common/Comments";

function EmployeeProjectProgress() {
    const [project, setProject] = useState<Project>();
    const [progress, setProgress] = useState<ProjectProgressPopulated>();
    const [video, setVidoe] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState(0);
    const { projectId } = useParams<{ projectId: string }>();
    const { progressId } = useParams<{ progressId: string }>();
    const [comment, setComment] = useState<string>("");
    const userId = useAppSelector((state) => state.employee.employee?._id);

    useEffect(() => {
        (async () => {
            if (projectId) {
                const response = await projectApi.projectDetails(projectId);
                console.log(response);
                if (response) {
                    setProject(response.project);
                    const foundProgress = response.project.progress?.find(
                        (progress: { _id: string | undefined }) =>
                            progress?._id === progressId
                    );
                    setProgress(foundProgress);
                }
            }
        })();
        console.log(progress, "progress", project);
    }, [projectId, progressId]);

    const handlePrevClick = () => {};

    const handleNextClick = () => {};

    const handleComment = async () => {
        if (comment.trim() === "") return toast.error("Enter a valid comment");

        const data = {
            comment,
            projectId,
            progressId,
            userId,
        };

        const response = await projectApi.addComment(data);
        if (response.success) {
            toast.success(response.message);
            setProject(response.project);
            const foundProgress = response.project.progress?.find(
                (progress: { _id: string | undefined }) =>
                    progress?._id === progressId
            );
            setProgress(foundProgress);
            setComment("");
        }
    };

    return (
        <>
            <EmployeeSideBar>
                <div>
                    <div className="p-10 flex justify-between">
                        <p className="text-xl font-bold">
                            <span>{project?.projectName}</span>
                            <span className="font-semibold">
                                {" "}
                                - {progress?.title}
                            </span>
                        </p>
                        {progress?.postedBy?._id === userId && (
                            <p className="text-sm text-center p-2 w-24 rounded-lg border-[1px]">
                                Edit Project
                            </p>
                        )}
                    </div>
                </div>
                <div className=" p-10 h-[450px] w-full flex flex-col md:flex-row">
                    <div className=" col-span-12 md:col-span-6 w-full text-justify overflow-y-scroll p-4">
                        <div className="mt-5">
                            <p>{progress?.details}</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center col-span-12 md:col-span-6 w-full p-2 ">
                        {video ? (
                            <div className="">
                                <ReactPlayer
                                    url={
                                        "https://www.youtube.com/watch?v=5O5rVhAaf0U"
                                    }
                                    controls={true}
                                    pip={true}
                                />
                            </div>
                        ) : (
                            <div>
                                {/* Image Display */}
                                <img
                                    className=" object-contain"
                                    src={progress?.imageUrls[imageIndex]}
                                    alt=""
                                />

                                {/* Buttons for Previous and Next */}
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={handlePrevClick}
                                        className="focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </button>
                                    <button
                                        onClick={handleNextClick}
                                        className="focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex px-10  overflow-hidden items-center h-32 my-5 gap-2">
                    {/* {
                    progress.video[0] !== "" && (
                        <div onClick={() => setVidoe(true)}>
                            <img
                                className="w-28"
                                src="https://media.tech-latest.com/wp-content/uploads/2022/06/16225232/YouTube-Featured.jpeg"
                                alt=""
                            />
                        </div>
                    )} */}

                    {progress?.imageUrls?.map((img, ind) => (
                        <img
                            key={ind}
                            onClick={() => {
                                setVidoe(false);
                                setImageIndex(ind);
                            }}
                            className="w-32 h-32 object-contain"
                            src={img}
                            alt=""
                        />
                    ))}
                </div>
                <div className="px-10">
                    <hr />

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
                    {progress?.comments && (
                        <Comments comments={progress?.comments} />
                    )}
                </div>
            </EmployeeSideBar>
        </>
    );
}

export default EmployeeProjectProgress;
