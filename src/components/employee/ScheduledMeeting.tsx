import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../Services/redux/hooks";
import meetingApi from "../../Services/apis/meetingApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Services/context/SocketProvider";
import { Meeting } from "../../interfaces/meeting";

const ScheduledMeeting = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const navigate = useNavigate()
    const socket = useSocket()
    const employeeData = useAppSelector((state) => state.employee.employee);

    useEffect(() => {
        (async () => {
            if(employeeData) {
                const response = await meetingApi.getScheduledMeetingOfEmployee(
                    employeeData?._id
                );
                if (response.success) {
                    setMeetings(response.meetings);
                }
            }
        })();
    }, [employeeData]);

    const handleCall = useCallback((meeting: Meeting) => {
        console.log( meeting.employee, meeting._id);
        socket?.emit('room:join', { email: meeting?.employee, room: meeting?._id });
    }, [socket]);
    
    const handleJoinRoom = useCallback((data: { email: any; room: any; }) => {
        const { email, room } = data;
        navigate(`/employee/room/${room}`);
    }, [navigate]);
    
    useEffect(() => {
        socket?.on('room:join', handleJoinRoom);
        return () => {
            socket?.off('room:join', handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    return (
        <>
            <h3 className="text-gray-200 my-4 text-xl font-bold">
                Scheduled Meetings
            </h3>
            <div>
                <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3 mb-4">
                    {meetings?.map((meeting) => (
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div
                                key={meeting?._id}
                                className="flex items-center mb-3"
                            >
                                <FontAwesomeIcon
                                    className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                    icon={faCalendarCheck}
                                    aria-hidden="true"
                                />
                                <p className=" font-normal h-fit text-gray-500 dark:text-gray-400">
                                    {new Date(
                                        meeting?.time
                                    )?.toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon
                                    className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                    icon={faClock}
                                    aria-hidden="true"
                                />
                                <p className=" font-normal h-fit text-gray-500 dark:text-gray-400">
                                    {new Date(
                                        meeting?.time
                                    )?.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => handleCall(meeting)}
                                    className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                >
                                    Call
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                >
                                    Message
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ScheduledMeeting;
