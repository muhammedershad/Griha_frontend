import toast from "react-hot-toast";
import axios from "../axios";

const addTimeSlot = async (data: any) => {
    try {
        const response = await axios.post("/meeting", data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
};

const getTimeSlotsForEmployee = async (employeeId: string, date: string) => {
    try {
        const response = await axios.get(
            `/meeting?employeeId=${employeeId}&date=${date}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
};

const cancelTimeSlot = async (meetingId: string) => {
    try {
        const response = await axios.patch(`/meeting/${meetingId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
};

const getTimeSlotsForUser = async (department: string, date: string) => {
    try {
        const response = await axios.get(
            `/meeting/allTimeSlots?department=${department}&date=${date}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
};

const bookMeeting = async (meetingId: string, userId: string) => {
    try {
        const response = await axios.post(
            `/meeting/book?meetingId=${meetingId}&userId=${userId}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
};

const getScheduledMeetingOfUser = async (userId: string) => {
    try {
        const response = await axios.get(`/meeting/book?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
};

const getScheduledMeetingOfEmployee = async (employeeId: string) => {
    try {
        const response = await axios.get(
            `/meeting/employee-meetings?employeeId=${employeeId}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
};

export default {
    addTimeSlot,
    getTimeSlotsForEmployee,
    cancelTimeSlot,
    getTimeSlotsForUser,
    bookMeeting,
    getScheduledMeetingOfUser,
    getScheduledMeetingOfEmployee,
};
