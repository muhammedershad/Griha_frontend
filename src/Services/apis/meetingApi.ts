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

export default {
    addTimeSlot,
    getTimeSlotsForEmployee
}