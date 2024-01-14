import toast from 'react-hot-toast';
import axios from '../Services/axios'
import { Employees } from '../interfaces/employee';
import { ChangePasswordInterface } from '../interfaces/changePassword';
import { BankDetailsInterface } from '../interfaces/bankDetails';

const employeeDetails = async () => {
    try {
        const response = await axios.get('/employee/employee')
        console.log(response.data);
        
        return response.data
    } catch (error) {
        console.log(error); 
    }
}

const updateProfilePhoto = async ( employeeId: string | null | undefined, imageUrl: string) => {
    try {
        const response = await axios.patch(`/employee/update-profile-photo`, {
            imageUrl: imageUrl,
            employeeId
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async ( data: Employees ) => {
    try {
        const response = await axios.patch( '/employee/profile', data ) 
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
    }
}

const UpdateSlice = async ( token: string) => {
    try {
        const response = await axios.post('/employee/employee', { token: token })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const changePassword = async ( data: ChangePasswordInterface ) => {
    try {
        console.log('here');
        
        const response = await axios.patch('/employee/change-password', data)
        return response.data
    } catch (error) {
        toast.error((error as Error)?.message)
        console.log(error);
    }
}

const updateBankDetails = async ( data: BankDetailsInterface ) => {
    try {
        const response = await axios.post('/employee/update-bank-details', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
    }
}

const getBankDetails = async (userId: string) => {
    try {
        const response = await axios.get(`/employee/bank-details/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
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

const allSeniorEmployees = async () => {
    try {
        const response = await axios.get('/employee/all-seniors')
        return response.data
    } catch (error) {
        (error as Error)?.message
    }
}

export const employeeApi = {
    updateProfilePhoto,
    employeeDetails,
    UpdateSlice,
    updateProfile,
    changePassword,
    updateBankDetails,
    getBankDetails,
    allEmployees,
    allSeniorEmployees
}