import toast from "react-hot-toast";
import { Tasks } from "../../interfaces/taks"
import axios from "../axios"

const addTask = async (data: Tasks) => {
    try {
        const response = await axios.post('/tasks', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const tasksByEmployee = async (employeeId: string) => {
    try {
        const response = await axios.get(`/tasks/employee/${employeeId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const taskDetails = async (taskId: string) => {
    try {
        const response = await axios.get(`/tasks/task-details/${taskId}`)
        return response.data

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const addResponse = async (data) => {
    try {
        const response = await axios.post('/tasks/response', data)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const addCommad = async (data) => {
    try {
        const response = await axios.post('/tasks/comment', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

export default {
    addTask,
    tasksByEmployee,
    taskDetails,
    addResponse,
    addCommad
}