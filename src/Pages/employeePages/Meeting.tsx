import React, { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import Spinner from "../../components/common/Spinner";
import Tabs from "../../components/common/Tabs";
import { Modal } from "../../components/common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TimeSlots from "../../components/employee/TimeSlots";
import ScheduledMeeting from "../../components/employee/ScheduledMeeting";

const Meeting = () => {
    const [meetings, setMeetings] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState('Scheduled');
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                mainHeading="Edit Project"
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <div className=" space-y-1 md:space-y-4 sm:p-3">
                    <button
                        onClick={closeModal}
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-[#8e1c1c] to-[#422c34] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                        cancel
                    </button>
                </div>
            </Modal>
            <EmployeeSideBar>
                {!meetings ? (
                    <Spinner />
                ) : (
                    <div className="p-10">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-gray-200 text-xl font-bold">
                                Meetings
                            </h3>
                            <p
                                onClick={openModal}
                                className="text-sm p-2 max-w-[100px] text-center rounded-lg border-[1px]"
                            >
                                Add Time Slots
                            </p>
                        </div>
                        <Tabs activeItem={activeItem} setActiveItem={setActiveItem} />
                        {
                            activeItem === 'Scheduled' && <ScheduledMeeting />
                        }
                        {
                            activeItem === 'TimeSlot' && <TimeSlots />
                        }
                        
                        
                    </div>
                )}
            </EmployeeSideBar>
        </>
    );
};

export default Meeting;
