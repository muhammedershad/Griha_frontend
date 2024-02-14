import { Project } from "./project";

export interface Tasks extends Document {
    _id?: string;
    taskName: string;
    shortDescription: string;
    assignedTo: string;
    status: string;
    dueDate: string;
    assignedDate: Date;
    assignedBy: string;
    attachments: string[] | null;
    updateDate: Date;
    department: string;
    details: string;
    project: string | Project;
    priority: string;
    comments: {
        comment: string;
        user: string;
        time: Date;
    }[];
    response: {
        details: string;
        user: string;
        time: Date;
        attachments: string[];
    }[];
}

export interface TaskPopulated extends Tasks {
    project: Project;
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
