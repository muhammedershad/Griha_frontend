import { useEffect, useState } from "react";
import Navbar from "../../components/Home/Navbar";
import { useParams } from "react-router-dom";
import projectApi from "../../Services/apis/projectApi";
import { featuredProjects } from "../../interfaces/featuredProject";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const UserProjectDetails = () => {
    const [project, setProject] = useState<featuredProjects>();
    const { projectId } = useParams<{ projectId: string }>();
    const [video, setVidoe] = useState<boolean>(true);
    const [imageIndex, setImageIndex] = useState<number>(0);
    useEffect(() => {
        (async () => {
            const response = await projectApi.featuredProjectDetails(
                projectId!
            );
            console.log(response?.data?.success);

            if (response?.data?.success) {
                setProject(response?.data?.projectDetails);
                setVidoe(
                    response.data.projectDetails.youtubeLink.trim() === ""
                        ? false
                        : true
                );
            }
        })();
    }, []);

    const handlePrevClick = () => {
        if (imageIndex === 0) setImageIndex(project?.images?.length! - 1);
        else setImageIndex(imageIndex - 1);
    };

    const handleNextClick = () => {
        if (imageIndex === project?.images?.length! - 1) setImageIndex(0);
        else setImageIndex(imageIndex + 1);
    };
    return (
        <>
            <Navbar />
            <div className="md:mx-44 mt-28 text-gray-400">
                <h3 className="text-2xl font-bold">{project?.projectName}</h3>

                <div className=" mt-8 h-[450px] w-full flex flex-col md:flex-row">
                    <div className=" col-span-12 md:col-span-6 w-full text-justify overflow-y-scroll p-4">
                        <div className="flex p-4">
                            <div className="flex flex-col">
                                <p>Project name</p>
                                <p>Client</p>
                                <p>Site Area</p>
                                <p>Location</p>
                                <p>Builtup Area</p>
                            </div>
                            <div className="ml-10 flex flex-col">
                                <p>- {project?.projectName}</p>
                                <p>- {project?.client}</p>
                                <p>- {project?.siteArea}</p>
                                <p>- {project?.location}</p>
                                <p>- {project?.builtupArea}</p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p>{project?.details}</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center col-span-12 md:col-span-6 w-full p-2 ">
                        {video ? (
                            <div className="">
                                <ReactPlayer
                                    url={project?.youtubeLink}
                                    controls={true}
                                    pip={true}
                                />
                            </div>
                        ) : (
                            <div>
                                {/* Image Display */}
                                <img
                                    className=" object-contain"
                                    src={project?.images[imageIndex]}
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
                <div className="flex overflow-hidden items-center h-32 my-5 gap-2">
                    {project?.youtubeLink !== "" && (
                        <div onClick={() => setVidoe(true)}>
                            <img
                                className="w-28"
                                src="https://media.tech-latest.com/wp-content/uploads/2022/06/16225232/YouTube-Featured.jpeg"
                                alt=""
                            />
                        </div>
                    )}

                    {project?.images?.map((img, ind) => (
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
            </div>
        </>
    );
};

export default UserProjectDetails;
