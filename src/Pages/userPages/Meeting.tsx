import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Home/SideBar";
import UserSideBar from "../../components/user/UserSideBar";
import meetingApi from "../../Services/apis/meetingApi";
import toast from "react-hot-toast";
import User from "../../interfaces/user";
import { useAppSelector } from "../../Services/redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Services/context/SocketProvider";
import messageApi from "../../Services/apis/messageApi";
import Swal from "sweetalert2";

const Meeting = () => {
    const [selectedService, setSelectedService] = useState("Construction");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [timeSlots, setTimeSlots] = useState();
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const userData: User = useAppSelector((state) => state.user.user);
    const services = [
        "Construction",
        "Architecture",
        "Interior Designing",
        "Landscape",
    ];
    useEffect(() => {
        const today = new Date();
        setMinDate(today.toISOString().split("T")[0]);

        const maxDateObj = new Date();
        maxDateObj.setDate(today.getDate() + 5);
        setMaxDate(maxDateObj.toISOString().split("T")[0]);

        (async () => {
            const formattedDate = new Date(selectedDate)
                .toISOString()
                .split("T")[0];
            const response = await meetingApi.getTimeSlotsForUser(
                selectedService,
                formattedDate
            );
            if (response.success) {
                setTimeSlots(response.timeSlots);
            }
        })();
        (async () => {
            if (userData) {
                const response = await meetingApi.getScheduledMeetingOfUser(
                    userData?._id
                );
                if (response.success) {
                    setMeetings(response.meetings);
                }
            }
        })();
    }, [selectedDate, selectedService, userData]);

    const handleServiceSelect = (service:any) => {
        setSelectedService(service);
    };
    const handleSelectedDateChange = async (event) => {
        setSelectedDate(event.target.value);
    };
    const handleTimeSelect = (time, id) => {
        setSelectedTime(time);
        setSelectedMeetingId(id);
    };
    const handleBooking = async () => {
        let error = false;
        if (!selectedDate) {
            toast.error("Select a date");
            error = true;
        }
        if (!selectedTime || !selectedMeetingId) {
            toast.error("Select a time");
            error = true;
        }
        if (!selectedService.trim()) {
            toast.error("Select a service");
            error = true;
        }
        if (error) return;

        const response = await meetingApi.bookMeeting(
            selectedMeetingId,
            userData?._id
        );
        if (response.success) {
            toast.success(response.message);
            setTimeSlots(
                timeSlots.filter((time) => time._id !== selectedMeetingId)
            );
            setSelectedTime(null);
            setSelectedMeetingId(null);
        }
    };

    //video call
    const navigate = useNavigate();
    const socket:any = useSocket();

    const handleCall = useCallback(
        (meeting: { employee: any; _id: any; user: { _id: any; }; }) => {
            console.log(meeting.employee, meeting._id);
            socket.emit("room:join", {
                email: meeting?.user._id,
                room: meeting?._id,
            });
        },
        [socket]
    );

    const handleJoinRoom = useCallback(
        (data: { email: any; room: any; }) => {
            const { email, room } = data;
            navigate(`/room/${room}`);
        },
        [navigate]
    );

    const handleMessage = async ( employeeId: string) => {
        const response = await messageApi.createConversation( userData._id, employeeId )
        console.log(response)
        if(response.success){
            navigate('/messages')
        }
    }

    const handleCancelBooking = async (meetingId: string) => {
        console.log(meetingId);
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            background: "rgb(44,48,58)",
            customClass: {
                title: "swal-text-white", // Add this class to style the title
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await meetingApi.cancelTimeSlot(meetingId);
                // console.log(response);
                if (response?.success) {
                    toast.success('Meeting cancelled');
                    setMeetings(meetings.filter((meeting:{_id:any}) => meeting?._id !== meetingId))
                }
            } else return;
        });
    }



    useEffect(() => {
        socket?.on("room:join", handleJoinRoom);
        return () => {
            socket?.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    return (
        <UserSideBar>
            <div className="w-full">
                <div className="relative mx-auto mb-20 z-0  overflow-hidden rounded-t-xl bg-emerald-400/60 py-32 text-center shadow-xl shadow-gray-800">
                    <h1 className="mt-2 z-0 px-8 text-3xl font-bold text-white md:text-5xl">
                        Book an appointment
                    </h1>
                    <p className="mt-6 z-0 text-lg text-white">
                        Get an appointment with our experienced architects and
                        engineers{" "}
                    </p>
                    <img
                        className="absolute top-0 left-0 opacity-50 -z-10 h-full w-full object-cover"
                        src="https://www.stirworld.com/images/article_gallery/the-skew-house-kerala-thought-parallels-stirworld-190928062012.jpg"
                    />
                </div>
                <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
                    <div>
                        <p className=" text-xl font-bold text-gray-300">
                            Scheduled Meeting
                        </p>
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
                                                onClick={() =>
                                                    handleCall(meeting)
                                                }
                                                
                                                className="text-white disabled:opacity-30 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                            >
                                                Call
                                            </button>
                                            <button
                                                onClick={() => handleMessage(meeting?.employee)}
                                                type="button"
                                                className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                            >
                                                Message
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleCancelBooking(meeting?._id)}
                                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className=" text-xl font-bold text-gray-300">
                            Select a service
                        </p>
                        <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                            {services.map((service) => (
                                <div className="relative" key={service}>
                                    <input
                                        className="peer hidden"
                                        id={`radio_${service}`}
                                        type="radio"
                                        name="radio"
                                        checked={selectedService === service}
                                        onChange={() =>
                                            handleServiceSelect(service)
                                        }
                                    />
                                    <span
                                        className={`absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 ${
                                            selectedService === service
                                                ? "border-emerald-400 bg-white"
                                                : "border-gray-300 bg-white"
                                        } peer-checked:border-emerald-400`}
                                    />
                                    <label
                                        className={`flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-800 ${
                                            selectedService === service
                                                ? "bg-emerald-600 text-white"
                                                : "peer-checked:bg-emerald-600 peer-checked:text-white"
                                        }`}
                                        htmlFor={`radio_${service}`}
                                    >
                                        <span className="mt-2 font-medium">
                                            {service}
                                        </span>
                                        <span className="text-xs uppercase">
                                            1 Hour
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="mt-8 text-xl font-bold text-gray-300">
                            Select a date
                        </p>

                        <div className="relative mt-4 w-56">
                            <div className="flex flex-col">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleSelectedDateChange}
                                    min={minDate}
                                    max={maxDate}
                                    className="bg-gray-800 text-gray-700 p-2 rounded border border-gray-600 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mt-8 text-xl font-bold text-gray-300">
                            Select a time
                        </p>

                        <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                            {timeSlots?.map((timeSlot) => (
                                <div
                                    className="flex relative"
                                    key={timeSlot?._id}
                                >
                                    <button
                                        className={`rounded-lg px-4 py-2 font-medium ${
                                            selectedTime === timeSlot?.time
                                                ? "bg-emerald-600 text-white"
                                                : "bg-emerald-100 text-emerald-900"
                                        } active:scale-95 flex-grow`}
                                        onClick={() =>
                                            handleTimeSelect(
                                                timeSlot?.time,
                                                timeSlot?._id
                                            )
                                        }
                                    >
                                        {new Date(
                                            timeSlot?.time
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }) ?? "adas"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </UserSideBar>
    );
};

export default Meeting;
