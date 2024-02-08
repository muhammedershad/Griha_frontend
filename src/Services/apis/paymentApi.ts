import toast from "react-hot-toast";
import axios from "../axios";


const createPaymentRequest = async (data) => {
    try {
        const response = await axios.post('/payment', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const allPaymentsOfAdmin = async () => {
    try {
        const response = await axios.get('/payment')
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const allPayamentOfUser = async (userId: string) => {
    try {
        const response =  await axios.get(`/payment/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}


export default {
    createPaymentRequest,
    allPayamentOfUser,
    allPaymentsOfAdmin
}