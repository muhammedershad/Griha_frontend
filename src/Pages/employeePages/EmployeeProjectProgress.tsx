import React, { useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import SideHeading from "../../components/common/SideHeading";
import { progress } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";

function EmployeeProjectProgress() {
  const [video, setVideo] = useState(false)
  function handleNextClick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  function handlePrevClick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

    return (
        <>
            <EmployeeSideBar>
                <SideHeading title={"Project Progress"} />
                <div className="md:mx-44 mt-28 text-gray-400">
                    <h3 className="text-2xl font-bold">
                        {project?.projectName}
                    </h3>

                    <div className=" mt-8 h-[450px] w-full flex flex-col md:flex-row">
                        <div className=" col-span-12 md:col-span-6 w-full text-justify overflow-hidden overflow-scroll p-4">
                            <div className="flex p-4">
                                <div>
                                    <p>Project name</p>
                                    <p>Client</p>
                                    <p>Site Area</p>
                                    <p>Location</p>
                                    <p>Builtup Area</p>
                                </div>
                                <div className="ml-10">
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
                                <ReactPlayer
                                    url={project?.youtubeLink}
                                    controls={true}
                                    pip={true}
                                />
                            ) : (
                                <div>
                                    {/* Image Display */}
                                    <img
                                        className=" object-contain"
                                        src={progress.images[imageIndex]}
                                        alt=""
                                    />

                                    {/* Buttons for Previous and Next */}
                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={handlePrevClick}
                                            className="focus:outline-none"
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                            />
                                        </button>
                                        <button
                                            onClick={handleNextClick}
                                            className="focus:outline-none"
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex overflow-hidden items-center h-32 my-5 gap-2">
                        {/* <div onClick={() => setVidoe(true)}> */}
                            <img
                                className="w-28"
                                src="https://media.tech-latest.com/wp-content/uploads/2022/06/16225232/YouTube-Featured.jpeg"
                                alt=""
                            />
                        </div>

                        {progress?.images?.map((img, ind) => (
                            <img
                                key={ind}
                                // onClick={() => {
                                //     setVidoe(false);
                                //     setImageIndex(ind);
                                // }}
                                className="w-32 h-32 object-contain"
                                src={img}
                                alt=""
                            />
                        ))}
                    </div>
                </div>
            </EmployeeSideBar>
        </>
    );
}

export default EmployeeProjectProgress;
