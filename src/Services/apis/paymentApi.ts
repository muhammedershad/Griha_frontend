import toast from "react-hot-toast";
import axios from "../axios";

const createPaymentRequest = async (data: any) => {
    try {
        const response = await axios.post("/payment", data);
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

const allPaymentsOfAdmin = async () => {
    try {
        const response = await axios.get("/payment");
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

const allPayamentOfUser = async (userId: string) => {
    try {
        const response = await axios.get(`/payment/${userId}`);
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

const pendingPaymentOfUser = async (userId: string) => {
    try {
        const response = await axios.get(`/payment/pending/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
}

export default {
    createPaymentRequest,
    allPayamentOfUser,
    allPaymentsOfAdmin,
    pendingPaymentOfUser
};
