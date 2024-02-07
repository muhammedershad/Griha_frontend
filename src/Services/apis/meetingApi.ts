import toast from "react-hot-toast";
import axios from "../axios"

const addTimeSlot = async (data) => {
    try {
        const response = await axios.post('/meeting', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const getTimeSlotsForEmployee = async ( employeeId: string, date: Date) => {
    try {
        const response = await axios.get(`/meeting?employeeId=${employeeId}&date=${date}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const cancelTimeSlot = async ( meetingId: string ) => {
    try {
        const response = await axios.patch(`/meeting/${meetingId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const getTimeSlotsForUser = async ( department: string, date: Date ) => {
    try {
        const response = await axios.get(`/meeting/allTimeSlots?department=${department}&date=${date}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const bookMeeting = async ( meetingId: string, userId: string ) => {
    try {
        const response = await axios.post(`/meeting/book?meetingId=${meetingId}&userId=${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const getScheduledMeetingOfUser = async ( userId: string ) => {
    try {
        const response = await axios.get(`/meeting/book?userId=${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const getScheduledMeetingOfEmployee = async ( employeeId: string ) => {
    try {
        const response = await axios.get(`/meeting/employee-meetings?employeeId=${employeeId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

export default {
    addTimeSlot,
    getTimeSlotsForEmployee,
    cancelTimeSlot,
    getTimeSlotsForUser,
    bookMeeting,
    getScheduledMeetingOfUser,
    getScheduledMeetingOfEmployee
}