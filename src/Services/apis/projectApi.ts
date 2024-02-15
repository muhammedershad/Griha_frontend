import toast from "react-hot-toast";
import axios from "../axios";
import {
    EditProjectDetails,
    ProjectProgressInterface,
    Project,
} from "../../interfaces/project";
import { featuredProjects } from "../../interfaces/featuredProject";

const createProject = async (data: Project) => {
    try {
        const response = await axios.post("/project/", data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const employeeProjects = async (employeeId: string) => {
    try {
        const response = await axios.get(
            `/project/employee-project/${employeeId}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const projectDetails = async (projectId: string) => {
    try {
        const response = await axios.get(
            `/project/project-details/${projectId}`
        );
        return response.data;
    } catch (error) {
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const editProject = async (projectId: string, data: EditProjectDetails) => {
    try {
        const response = await axios.patch(`/project/${projectId}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const addProgress = async (
    data: ProjectProgressInterface,
    projectId: string
) => {
    try {
        const response = await axios.post(
            `/project/post-progress/${projectId}`,
            data
        );
        return response.data;
    } catch (error) {
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
        console.log(error);
    }
};

const userProjects = async (userId: string) => {
    try {
        const response = await axios.get(`/project/user-project/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const allPorjects = async () => {
    try {
        const response = await axios.get("/project/all-projects");
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const addFeatruedProjects = async (data: featuredProjects) => {
    try {
        const response = await axios.post("/project/featured-projects", data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const updateFeatruedProjects = async (data: featuredProjects) => {
    try {
        const response = await axios.put("/project/featured-projects", data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const allFeaturedPorjects = async (
    category: string,
    query: string,
    page: number
) => {
    try {
        const response = await axios.get(
            `/project/featured-projects/${category}?search=${query}&page=${page}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const featuredProjectDetails = async (projectId: string) => {
    try {
        const response = await axios.get(
            `/project/featured-project-details/${projectId}`
        );
        return response;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const projectProgress = async (projectId: string, progressId: string) => {
    try {
        const response = await axios.get(`project/${projectId}/${progressId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

const addComment = async (data: any) => {
    try {
        const response = await axios.post("/project/comment", data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            (error as any)?.response?.data?.message ||
                (error as Error)?.message ||
                "Unknown error"
        );
    }
};

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
    addComment,
};
