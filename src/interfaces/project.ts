export interface project {
    _id?: string;
    projectName: string;
    postedBy?: string;
    clients: string[];
    details: string;
    time?: Date;
    location: string;
    team: {
        members?: string[] | null;
        teamLead?: string;
    } | null;
    address: {
        address: string;
        district: string;
        state: string;
        pincode: string;
    } | null;
    progress?: {
        _id: string | null;
        attachments: string[] | null;
        date: Date;
        details: string;
        shortDiscription: string;
        submittedBy: string;
        title: string;
        comments: {
            comment: string;
            user: string
            time: Date
        }[];
    };
}

export interface ProjectForm {
    projectName: string,
    address: string,
    district: string,
    state: string,
    pincode: string,
    longitudeAndLatitude: string
}