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

const updateProfilePhoto = async (employeeId: string, imageUrl: string) => {
    try {
        const response = await axios.patch(`/employee/update-profile-photo`, {
            employeeId: employeeId,
            imageUrl: imageUrl
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const employeeApi = {
    updateProfilePhoto,
    employeeDetails
}