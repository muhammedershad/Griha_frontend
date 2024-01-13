import toast from 'react-hot-toast';
import axios from '../axios'
import { project } from '../../interfaces/project';


const createProject = async ( data: project ) => {
    try {
        const response = await axios.post('/project/', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
    }
}

const employeeProjects = async ( employeeId: string ) => {
    try {
        const response = await axios.get(`/project/employee-project/${employeeId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
    }
}

const projectDetails = async (projectId: string) => {
    try {
        const response = await axios.get(`/project/project-details/${projectId}`)
        return response.data
    } catch (error) {
        toast.error((error as Error).message)
    }
}

export default {
    createProject,
    employeeProjects,
    projectDetails
}