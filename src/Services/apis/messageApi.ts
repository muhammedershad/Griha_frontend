import toast from "react-hot-toast";
import axios from "../axios";

const conversation = async (userId: string | undefined) => {
    try {
        const response = await axios.get(`/conversation/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const chat = async (conversationId: string) => {
    try {
        const response = await axios.get(`/message/${conversationId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const sendMessage = async (data: any) => {
    try {
        const response = await axios.post("/message/", data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const createConversation = async (userId: string, employeeId: string) => {
    try {
        const response = await axios.post("/conversation/", {
            senderId: userId,
            receiverId: employeeId,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

export default {
    conversation,
    chat,
    sendMessage,
    createConversation,
};
