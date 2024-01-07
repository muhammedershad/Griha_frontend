import axios from '../Services/axios'

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
    UpdateSlice
}