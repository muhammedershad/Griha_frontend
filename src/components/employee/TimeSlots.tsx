import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import meetingApi from "../../Services/apis/meetingApi";
import { useAppSelector } from "../../Services/redux/hooks";
import Swal from "sweetalert2";
import { Meeting } from "../../interfaces/meeting";

const TimeSlots = () => {
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [selectedButton, setSelectedButton] = useState<string | null>()
    const [department, setDepartment] = useState("Construction");
    const employeeData = useAppSelector((state) => state.employee.employee);
    const [timeSlots, setTimeSlots] = useState([]);
    const [timeArray, setTimeArray] = useState([
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
    ]);

    useEffect(() => {
        const today = new Date();
        console.log(today)
        setMinDate(today.toISOString().split("T")[0]);

        const maxDateObj = new Date();
        maxDateObj.setDate(today.getDate() + 5);
        setMaxDate(maxDateObj.toISOString().split("T")[0]);

        if (employeeData?._id) {
            (async () => {
                const formattedDate = today.toISOString().split("T")[0];
                const response = await meetingApi.getTimeSlotsForEmployee(
                    employeeData?._id,
                    formattedDate
                );
                console.log(response);
                if (response.success) {
                    setTimeSlots(response.timeSlots);
                    setSelectedDate(formattedDate);
                    handleTimeSlotFiltering(response.timeSlots)
                }
            })();
        }
    }, [employeeData]);

    const handleButtonClick = (time: string) => {
        setSelectedButton(time);
    };

    const handleDateChange = async (event: { target: { value: string }; }) => {
        setDate(event.target.value);
        const response = await meetingApi.getTimeSlotsForEmployee(
            employeeData?._id!,
            event.target.value
        );
        if (response.success) {
            setTimeSlots(response.timeSlots);
        }
    };

    const handleSelectedDateChange = async (e: { target: { value: string }; }) => {
        setSelectedDate(e.target.value);
        const response = await meetingApi.getTimeSlotsForEmployee(
            employeeData?._id!,
            e.target.value
        );
        console.log(response);
        if (response.success) {
            handleTimeSlotFiltering(response.timeSlots);
        }
    };

    const handleTimeSlotFiltering = (timeSlots: any[]) => {

        const bookedTimes = timeSlots.map((timeSlot) =>
            new Date(timeSlot?.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
        console.log(bookedTimes);

        const initialTime = [
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
        ];

        // Filter out booked times from the initial array
        const availableTimes = initialTime.filter((time) => {
            const formattedTime = new Date(
                `2000-01-01 ${time}`
            ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            return !bookedTimes.includes(formattedTime);
        });
        console.log(availableTimes);

        setTimeArray(availableTimes);
    };

    const handleCancelTimeSlot = async (timeSlotId: string) => {
        console.log(timeSlotId);
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
                const response = await meetingApi.cancelTimeSlot(timeSlotId);
                // console.log(response);
                if (response?.success) {
                    toast.success(response.message);
                    console.log(response);
                    setTimeSlots(timeSlots.filter((timeSlot:Meeting) => timeSlot?._id !== timeSlotId))
                }
            } else return;
        });
    };

    const handleAddTimeSlot = async () => {
        let error: boolean = false;
        if (!department.trim()) {
            toast.error("Select department");
            error = true;
        }
        if (!selectedDate) {
            toast.error("Select Date");
            error = true;
        }
        if (!selectedButton) {
            toast.error("Select time");
            error = true;
        }
        if (error) return;
        const combinedDateTime = new Date(`${selectedDate}T${selectedButton}`);
        const data = {
            time: combinedDateTime,
            employee: employeeData?._id,
            department,
        };
        const response = await meetingApi.addTimeSlot(data);
        if (response.success) {
            toast.success(response.message);
            setDepartment("Construction");
            setSelectedButton(null);
            setSelectedDate("");
        }
    };
    return (
        <>
            <div>
                <p className="text-lg text-gray-200 my-3">
                    Time Slots Assigned
                </p>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    min={minDate}
                    max={maxDate}
                    className="bg-gray-800 text-gray-700 p-2 rounded border border-gray-600 outline-none"
                />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                {timeSlots.map((timeSlot: Meeting) => (
                    <div className="flex relative">
                        <button
                            key={timeSlot?._id}
                            className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95 flex-grow"
                        >
                            {new Date(timeSlot?.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }) ?? "adas"}
                        </button>
                        <div
                            onClick={() => handleCancelTimeSlot(timeSlot?._id!)}
                            className="absolute top-0 right-0 mt-2 mr-2"
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="text-red-600 cursor-pointer"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <p className="text-lg text-gray-200 my-3">Add Time Slots</p>
                <div className="max-w-[300px]">
                    <div className="flex flex-col">
                        <label htmlFor="date" className="text-sm mb-2">
                            Selelct Date
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleSelectedDateChange}
                            min={minDate}
                            max={maxDate}
                            className="bg-gray-800 text-gray-700 p-2 rounded border border-gray-600 outline-none"
                        />
                    </div>
                    <div className="relative h-10 w-full my-4 min-w-[200px]">
                        <select
                            onChange={(event) => {
                                setDepartment(event.target.value);
                            }}
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-600"
                        >
                            <option
                                className="bg-gray-500"
                                value="Construction"
                            >
                                Construction
                            </option>
                            <option
                                className="bg-gray-600"
                                value="Architecture"
                            >
                                Architecture
                            </option>
                            <option className="bg-gray-500" value="Landscape">
                                Landscape
                            </option>
                            <option className="bg-gray-600" value="Interior">
                                Interior
                            </option>
                        </select>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:peer-placeholder-shown:text-white">
                            Select the category
                        </label>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                        {timeArray.map((time) => (
                            <button
                                className={`rounded-lg ${
                                    selectedButton === time
                                        ? "bg-blue-500"
                                        : "bg-emerald-100"
                                } px-4 py-2 font-medium text-emerald-900 active:scale-95`}
                                onClick={() => handleButtonClick(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleAddTimeSlot}
                        className="bg-slate-700 my-4 w-full text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                    >
                        {"Add Time Slot"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default TimeSlots;
