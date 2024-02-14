import { Employees } from "./employee";
import User from "./user";

export interface Project {
    _id?: string;
    projectName: string;
    postedBy?: string | Employees;
    clients: (string | User | Employees)[];
    details: string;
    time?: Date;
    location: string;
    team?: {
        members?: (string | Employees)[];
        teamLead?: string | Employees;
    };
    address: {
        address: string;
        district: string;
        state: string;
        pincode: string;
    } | null;
    progress?: [
        {
            _id: string;
            title: string;
            shortDiscription: string;
            details: string;
            imageUrls: string[];
            videoUrls: string[];
            otherFileUrls: string[];
            postedBy: string | Employees;
            date: Date;
            comments: {
                comment: string;
                user: string;
                time: Date;
                id?: string;
            }[];
        }
    ];
}

export interface ProjectForm {
    projectName: string;
    address: string;
    district: string;
    state: string;
    pincode: string;
    longitudeAndLatitude: string;
}

export interface EditProjectDetails {
    projectName: string;
    location: string;
    teamLead: string;
    clients: string[];
    teamMembers: string[];
    address: {
        address: string;
        district: string;
        state: string;
        pincode: string;
    };
}

export interface ProjectProgressInterface {
    date?: any;
    title: string;
    shortDiscription: string;
    details: string;
    imageUrls: string[];
    videoUrls: string[];
    otherFileUrls: string[];
    postedBy: string | Employees;
    _id?: string;
    comments?: {
        comment: string;
        user: Employees;
        time: Date;
        id: string;
    }[];
}

export interface ProjectPopulated extends Project {
    clients: User[];
    postedBy: Employees;
    team: {
        members: Employees[];
        teamLead: Employees;
    };
}

type PostedByType = string;
export interface ProjectProgressPopulated extends ProjectProgressInterface {
    postedBy: Employees;
}
