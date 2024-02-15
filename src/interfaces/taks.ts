import { Employees } from "./employee";
import { Project } from "./project";

export interface Tasks extends Document {
    _id?: string;
    taskName: string;
    shortDescription: string;
    assignedTo: string | Employees;
    status: string;
    dueDate: string;
    assignedDate: Date;
    assignedBy: string | Employees;
    attachments: string[] | null;
    updateDate: Date;
    department: string;
    details: string;
    project: string | Project;
    priority: string;
    comments: {
        comment: string;
        user: Employees | string;
        time: Date;
        _id?: string;
    }[];
    response: {
        details: string;
        user: Employees | string;
        time: Date;
        attachments: string[];
    }[];
}

export interface TaskPopulated extends Tasks {
    project: Project;
    assignedTo: Employees;
    assignedBy: Employees;
    comments: {
        comment: string;
        user: Employees;
        time: Date;
        _id?: string;
    }[];
}

export interface TaskFormData {
    formData?: any;
    details: string;
    department: string;
    attachments: string[];
    assignedBy: string;
    dueDate: string;
    assignedTo: string;
    project: string;
    priority: any;
}
