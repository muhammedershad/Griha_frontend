import axios from "./axios";
import response from "../interfaces/apiResponce";
import FormData from "../interfaces/signupInterface";
import LoginFormData from "../interfaces/login";

const userExistsCheck = async (email: string): Promise<response> => {
    try {
        const response = await axios.get(
            `/user/check-user-email?email=${email}`
        );

        const userExists = response.data;
        return userExists;
    } catch (error) {
        console.error("Error checking user existence:", error);
        throw error; // You might want to handle this error more gracefully based on your use case
    }
};

const signup = async (data: FormData) => {
    try {
        console.log("Request Payload:", data);
        const response = await axios.post("/user/signup", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const verify_otp = async (data: FormData) => {
    try {
        const response = await axios.post ('/user/verify-otp', data);
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}

const login = async ( data: LoginFormData ) => {
    try {
        const response = await axios.post( '/user/login', data);
        console.log(response,'response')
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export default {
    userExistsCheck,
    signup,
    verify_otp,
    login
};
