import toast from 'react-hot-toast';
import axios from '../axios'


const createProject = async () => {
    try {
        const response = await axios.post('/project')
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
    }
}

export default {
    createProject
}