export interface User {
    phone: number | string;
    createdAt: any;
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: number;
    image: string | null;
    client: boolean;
    isBlocked: boolean;
    jobRole?: string
}

export default User;