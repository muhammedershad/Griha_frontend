import { project } from "./project";

export interface Tasks extends Document {
    _id?: string;
    taskName: string;
    shortDescription: string;
    assignedTo: string;
    status: string;
    dueDate: string 
    assignedDate: Date;
    assignedBy: string;
    attachments: string[] | null;
    updateDate: Date;
    department: string;
    details: string;
    project: (string | project);
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
        attachments: string[]
    }[]
}

export interface TaskPopulated extends Tasks {
    project: project
}
