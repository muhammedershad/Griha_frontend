import User from "./user";

export interface Meeting {
    _id?: string;
    time: Date;
    employee: string;
    user: string | User;
    status: string;
    department: string;
}

export interface MeetingPopulated extends Meeting {
    user: User;
}
