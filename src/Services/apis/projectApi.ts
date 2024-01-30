import toast from 'react-hot-toast';
import axios from '../axios'
import { EditProjectDetails, ProjectProgress, project } from '../../interfaces/project';
import { featuredProjects } from '../../interfaces/featuredProject';
import { progress } from '@material-tailwind/react';


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

const editProject = async (projectId: string, data: EditProjectDetails) => {
    try {
        const response = await axios.patch(`/project/${projectId}`, data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error).message)
    }
}

const addProgress = async (data: ProjectProgress, projectId: string) => {
    try {
        const response = await axios.post(`/project/post-progress/${projectId}`, data)
        return response.data
    } catch (error) {
        toast.error((error as Error).message)
        console.log(error);
        
    }
}

const userProjects = async ( userId: string) => {
    try {
        const response = await axios.get(`/project/user-project/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
    }
}

const allPorjects = async () => {
    try {
        const response = await axios.get('/project/all-projects')
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message)
    }
}

const addFeatruedProjects = async (data: featuredProjects) => {
    try {
        const response = await axios.post('/project/featured-projects', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const updateFeatruedProjects = async (data: featuredProjects) => {
    try {
        const response = await axios.put('/project/featured-projects', data)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const allFeaturedPorjects = async (category: string, query: string, page: number) => {
    try {
        const response = await axios.get(`/project/featured-projects/${category}?search=${query}&page=${page}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const featuredProjectDetails = async (projectId: string) => {
    try {
        const response = await axios.get(`/project/featured-project-details/${projectId}`)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const projectProgress = async (projectId: string, progressId: string) => {
    try {
        const response = await axios.get(`project/${projectId}/${progressId}`)
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

const addComment = async (data) => {
    try {
        const response = await axios.post('/project/comment', data )
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || (error as Error)?.message)
    }
}

export default {
    createProject,
    employeeProjects,
    projectDetails,
    editProject,
    addProgress,
    userProjects,
    allPorjects,
    addFeatruedProjects,
    allFeaturedPorjects,
    featuredProjectDetails,
    updateFeatruedProjects,
    projectProgress,
    addComment
}