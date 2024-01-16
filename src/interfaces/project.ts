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
    progress?: [{
        title: string;
        shortDiscription: string;
        details: string;
        imageUrls: string[];
        videoUrls: string[];
        otherFileUrls: string[];
        postedBy: string;
        date: Date
        comments: {
            comment: string;
            user: string;
            time: Date;
        }[];
    }];
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

export interface ProjectProgress {
    title: string;
    shortDiscription: string;
    details: string;
    imageUrls: string[];
    videoUrls: string[];
    otherFileUrls: string[];
    postedBy: string;
}
