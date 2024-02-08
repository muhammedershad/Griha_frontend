import toast from "react-hot-toast";
import axios from "../axios";

const conversation = async (userId: string | undefined) => {
    try {
        const response = await axios.get(`/conversation/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const chat = async (conversationId: string) => {
    try {
        const response = await axios.get(`/message/${conversationId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const sendMessage = async (data) => {
    try {
        const response = await axios.post('/message/', data)       
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const createConversation = async (userId: string, employeeId: string) => {
    try {
        const response = await axios.post('/conversation/', {senderId: userId, receiverId: employeeId})
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

export default {
    conversation,
    chat,
    sendMessage,
    createConversation
}