import React, { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import Form from "../common/Form";
import toast from "react-hot-toast";
import { ProjectPopulated, Project, ProjectProgressInterface } from "../../interfaces/project";
import projectApi from "../../Services/apis/projectApi";
import { useAppSelector } from "../../Services/redux/hooks";
import uploadImageToFirebase from "../../Services/firebase/imageUploader";
import uploadVideosToFirebase from "../../Services/firebase/videoUpload";
import uploadOtherFilesToFirebase from "../../Services/firebase/otherFiles";

interface FormData {
    title: string;
    shortDiscription: string;
}

interface Props {
    project: Project;
    setProject: (project: ProjectPopulated) => void;
    user: boolean;
}
const ProjectProgressHeader: React.FC<Props> = ({
    project,
    setProject,
    user,
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>();
    const [details, setDetails] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [otherFiles, setOtherFiles] = useState<File[]>([]);
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const [videoUrl, setVideoUrl] = useState<string[]>([]);
    const [otherFilesUrl, setOtherFilesUrl] = useState<string[]>([]);
    const [error, setError] = useState<boolean>(false);
    const employee = useAppSelector((state) => state.employee.employee);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFiles([]);
        setImages([]);
        setVideos([]);
        setOtherFiles([]);
    };

    useEffect(() => {
        console.log(formData, files, details, "formdata");
        console.log(images, "image", videos, "video", otherFiles);
        console.log(imageUrl);

        handleCreateProgress();
    }, [formData]);

    const handleCreateProgress = async () => {
        setError(false);
        let imageUrls = []
        let videoUrls: any[] = []
        let fileUrls: any[] = []
        if (formData) {
            if (!formData.shortDiscription.trim()) {
                toast.error("Enter a valid short discription");
                setError(true);
            }
            if (!formData.title.trim()) {
                toast.error("Enter valid task name");
                setError(true);
            }
            if (!details?.trim()) {
                toast.error("Enter the details of the task");
                setError(true);
            }
            if (error) return;

            if (images.length > 0) {
                imageUrls = await uploadImageToFirebase(
                    images,
                    "project_progress_images/"
                );
                console.log(imageUrls)
                if (!imageUrls) return toast.error("Error in uploadin images")
            }
            if (videos.length > 0) {
                console.log("here video");

                videoUrls = await uploadVideosToFirebase(
                    videos,
                    "project_progress_video/"
                )
                if (!videoUrls) return toast.error("Error in uploadin images") 
            }
            if (otherFiles.length > 0) {
                console.log("here, other files");

                fileUrls = await uploadOtherFilesToFirebase(
                    otherFiles,
                    "project_progress_file/"
                )
                if (!fileUrls) return toast.error("Error in uploadin images")
            }

            await addPost(imageUrls, videoUrls, fileUrls);
        }
    };

    const addPost = async (imageUrls: any[], videoUrls: any[], fileUrls: any[]) => {
        const data: ProjectProgressInterface = {
            title: formData?.title!,
            shortDiscription: formData?.shortDiscription!,
            details: details,
            imageUrls,
            videoUrls,
            otherFileUrls: fileUrls,
            postedBy: employee?._id!,
        };

        const response = await projectApi.addProgress(data, project?._id!);
        if (response?.success) {
            toast.success("Progress Posted");
            setProject(response?.project);
            closeModal();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImages([]);
        setVideos([]);
        setOtherFiles([]);
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            selectedFiles.forEach((file) => {
                const extension = file.name.split(".").pop()?.toLowerCase();

                if (extension) {
                    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
                        setImages((prevImages) => [...prevImages, file]);
                    } else if (["mp4", "mov", "avi"].includes(extension)) {
                        setVideos((prevVideos) => [...prevVideos, file]);
                    } else {
                        setOtherFiles((prevOtherFiles) => [
                            ...prevOtherFiles,
                            file,
                        ]);
                    }
                } else {
                    // Handle cases where the file doesn't have an extension
                    console.log(`File without extension: ${file.name}`);
                }
            });
        }
    };
    const formFields = [
        {
            placeholder: "Task Name",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "title",
        },
        {
            placeholder: "Short Discription",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "shortDiscription",
        },
    ];
    return (
        <>
            <Modal
                mainHeading="Add Project Progress"
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <div className=" space-y-1 md:space-y-4 sm:p-3">
                    <Form obj={formFields} setData={setFormData}>
                        <div>
                            <label
                                htmlFor={"Project Details"}
                                className="flex mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                            >
                                {"Task Details"}
                            </label>
                            <textarea
                                onChange={(e) => setDetails(e.target.value)}
                                value={details}
                                id="message"
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write Task Details here..."
                                defaultValue={""}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor={"Project Details"}
                                className="flex mb-2 text-base justify-start font-medium text-gray-900 dark:text-white"
                            >
                                Upload Files
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="multiple_files"
                                type="file"
                                onChange={(e) => handleFileUpload(e)}
                                multiple
                            />
                        </div>
                    </Form>
                    <button
                        onClick={closeModal}
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-[#8e1c1c] to-[#422c34] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                        cancel
                    </button>
                </div>
            </Modal>
            <div className="flex justify-between mb-2 items-center h-fit w-full">
                <h3 className="font-semibold text-lg mb-3">Project Progress</h3>
                {!user && (
                    <p
                        onClick={openModal}
                        className="text-sm p-2 rounded-lg border-[1px]"
                    >
                        Add Progress
                    </p>
                )}
            </div>
        </>
    );
};

export default ProjectProgressHeader;
