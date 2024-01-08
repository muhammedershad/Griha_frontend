import toast from 'react-hot-toast';
import axios from '../Services/axios'
import { Employees } from '../interfaces/employee';

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

export const employeeApi = {
    updateProfilePhoto,
    employeeDetails,
    UpdateSlice,
    updateProfile
}