import axios from "./axios";
import response from "../interfaces/apiResponce";
import FormData from "../interfaces/signupInterface";
import LoginFormData from "../interfaces/login";
import { EmployeesForm } from "../interfaces/employee";

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

const check_email = async ( email: string ) => {
    try {
        const response = await axios.get(`/user/check-email?email=${email}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const check_username = async ( username: string ) => {
    try {
        const response = await axios.get(`/user/check-username?username=${username}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log( error )
    }
}

const googleAuth = async () => {
    try {
        axios.get('/auth')
    } catch (error) {
        console.log(error);
        
    }
}

const resend_OTP = async ( email: string )  => {
    try {
        const response = await axios.post('/user/resend-otp', {
            email: email
        })
        console.log(response);
        
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

const adminLogin = async ( data: LoginFormData ) => {
    try {
        const response = await axios.post( '/admin/login', data);
        console.log(response,'response')
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const employeeLogin = async ( data: LoginFormData ) => {
    try {
        const response = await axios.post( '/employee/login', data);
        console.log(response,'response')
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const users = async () => {
    try {
        const response = await axios.get( '/user/users' )
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const blockUser = async ( userId: string ) => {
    try {
        const response = await axios.patch( `/user/block-user?userId=${userId}` )
        return response.data
    } catch (error) {
        console.log(error);   
    }
}

const userRoleChange = async ( userId: string ) => {
    try {
        const response = await axios.patch( `/user/change-user-role?userId=${userId}`)
        return response.data
    } catch (error) {
        console.log(error); 
    }
}

const addEmployee = async ( data: EmployeesForm ) => {
    try {
        // console.log(data);
        const response = await axios.post( '/employee/register', data )
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

const allEmployees = async () => {
    try {
        const response = await axios.get( '/employee/allEmployees' )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const blockEmployee = async ( employeeId: string ) => {
    try {
        const response = await axios.patch( `/employee/block-employee?employeeId=${employeeId}` )
        return response.data
    } catch (error) {
        console.log(error);   
    }
}

const employeeRoleChange = async ( employeeId: string ) => { 
    try {
        const response = await axios.patch( `/employee/change-employee-role?employeeId=${employeeId}`)
        return response.data
    } catch (error) {
        console.log(error); 
    }  
}

const adminLogout = async () => {
    try {
        const response = await axios.post( '/admin/logout' )
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

const userLogout = async () => {
    try {
        const response = await axios.post( '/user/logout' )
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

const employeeLogout = async () => {
    try {
        const response = await axios.post( '/employee/logout' )
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

const allClients = async () => {
    try {
        const response = await axios.get('/user/all-clients')
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default {
    userExistsCheck,
    signup,
    verify_otp,
    login,
    check_email,
    check_username,
    googleAuth,
    resend_OTP,
    adminLogin,
    employeeLogin,
    users,
    blockUser,
    userRoleChange,
    addEmployee,
    allEmployees,
    blockEmployee,
    employeeRoleChange,
    adminLogout,
    userLogout,
    employeeLogout,
    allClients
};
