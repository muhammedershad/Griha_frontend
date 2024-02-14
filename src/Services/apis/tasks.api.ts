import toast from "react-hot-toast";
import { TaskFormData, Tasks } from "../../interfaces/taks"
import axios from "../axios"

const addTask = async (data: TaskFormData) => {
    try {
        const response = await axios.post('/tasks', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
}

const tasksByEmployee = async (employeeId: string) => {
    try {
        const response = await axios.get(`/tasks/employee/${employeeId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
}

const taskDetails = async (taskId: string) => {
    try {
        const response = await axios.get(`/tasks/task-details/${taskId}`)
        return response.data

    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
}

const addResponse = async (data: any) => {
    try {
        const response = await axios.post('/tasks/response', data)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
}

const addCommad = async (data: any) => {
    try {
        const response = await axios.post('/tasks/comment', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as any)?.response?.data?.message || (error as Error)?.message || 'Unknown error')
    }
}

export default {
    addTask,
    tasksByEmployee,
    taskDetails,
    addResponse,
    addCommad
}