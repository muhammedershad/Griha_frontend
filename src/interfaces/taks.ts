export interface Tasks extends Document {
    _id: string;
    taskName: string;
    shortDescription: string;
    assignedTo: string;
    status: string;
    dueDate: Date;
    assignedDate: Date;
    assignedBy: string;
    attachments: string[] | null;
    updateDate: Date;
    department: string;
    details: string;
    project: string;
    comments: {
        comment: string;
        user: string;
        time: Date;
    }[];
}
