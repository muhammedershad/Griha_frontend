import React, { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import Form from "../common/Form";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Services/firebase";
import { ProjectProgress, project } from "../../interfaces/project";
import projectApi from "../../Services/apis/projectApi";
import { useAppSelector } from "../../Services/redux/hooks";

interface FormData {
    title: string;
    shortDiscription: string;
}

interface Props {
    project: project;
    setProject: (project: project) => void;
    user: boolean;
}
const ProjectProgressHeader: React.FC<Props> = ({ project, setProject, user }) => {
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
        setImageUrl([]);
        setVideoUrl([]);
        setOtherFilesUrl([]);
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
                console.log("here");

                const metadata = {
                    contentType: "image/jpeg",
                };

                images.forEach((image) => {
                    const storageRef = ref(
                        storage,
                        "project_progress_images/" + image.name
                    );
                    const uploadTask = uploadBytesResumable(
                        storageRef,
                        image,
                        metadata
                    );

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case "paused":
                                    console.log("Upload is paused");
                                    break;
                                case "running":
                                    console.log("Upload is running");
                                    break;
                            }
                        },
                        (error) => {
                            switch (error.code) {
                                case "storage/unauthorized":
                                    toast.error(
                                        "Unauthorized access to firebase"
                                    );
                                    break;
                                case "storage/canceled":
                                    toast.error("Profile uploading failed");
                                    break;
                                case "storage/unknown":
                                    toast.error(
                                        "Profile uploading failed, Error in firebase"
                                    );
                                    break;
                            }
                            return toast.error(
                                "Error in uploading profile photo"
                            );
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                async (downloadURL: string) => {
                                    setImageUrl([...imageUrl, downloadURL]);
                                    console.log(imageUrl, "here");
                                }
                            );
                        }
                    );
                });
            }
            if (videos.length > 0) {
                console.log("here video");

                const metadata = {
                    contentType: "video/mp4",
                };

                images.forEach((video) => {
                    const storageRef = ref(
                        storage,
                        "project_progress_video/" + video.name
                    );
                    const uploadTask = uploadBytesResumable(
                        storageRef,
                        video,
                        metadata
                    );

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case "paused":
                                    console.log("Upload is paused");
                                    break;
                                case "running":
                                    console.log("Upload is running");
                                    break;
                            }
                        },
                        (error) => {
                            switch (error.code) {
                                case "storage/unauthorized":
                                    toast.error(
                                        "Unauthorized access to firebase"
                                    );
                                    break;
                                case "storage/canceled":
                                    toast.error("Profile uploading failed");
                                    break;
                                case "storage/unknown":
                                    toast.error(
                                        "Uploading failed, Error in firebase"
                                    );
                                    break;
                            }
                            return toast.error("Error in uploading video");
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                async (downloadURL: string) => {
                                    setVideoUrl([...videoUrl, downloadURL]);
                                    console.log(videoUrl, "here");
                                }
                            );
                        }
                    );
                });
            }
            if (otherFiles.length > 0) {
                console.log("here, other files");

                // const metadata = {
                //     contentType: "image/jpeg",
                // };

                images.forEach((file) => {
                    const storageRef = ref(
                        storage,
                        "project_progress_file/" + file.name
                    );
                    const uploadTask = uploadBytesResumable(
                        storageRef,
                        file
                        // metadata
                    );

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case "paused":
                                    console.log("Upload is paused");
                                    break;
                                case "running":
                                    console.log("Upload is running");
                                    break;
                            }
                        },
                        (error) => {
                            switch (error.code) {
                                case "storage/unauthorized":
                                    toast.error(
                                        "Unauthorized access to firebase"
                                    );
                                    break;
                                case "storage/canceled":
                                    toast.error("Profile uploading failed");
                                    break;
                                case "storage/unknown":
                                    toast.error(
                                        "Profile uploading failed, Error in firebase"
                                    );
                                    break;
                            }
                            closeModal();
                            return toast.error("Error in uploading files");
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                async (downloadURL: string) => {
                                    setOtherFilesUrl([
                                        ...otherFilesUrl,
                                        downloadURL,
                                    ]);
                                    console.log(otherFilesUrl, "here");
                                }
                            );
                        }
                    );
                });
            }

            addPost();
        }
    };

    const addPost = async () => {
        const data: ProjectProgress = {
            title: formData.title,
            shortDiscription: formData.shortDiscription,
            details: details,
            imageUrls: imageUrl,
            videoUrls: videoUrl,
            otherFileUrls: otherFilesUrl,
            postedBy: employee?._id,
        };

        const response = await projectApi.addProgress(data, project?._id);
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
                                className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
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
                                className="flex block mb-2 text-base justify-start font-medium text-gray-900 dark:text-white"
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
