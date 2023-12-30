export interface User {
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
}

export default User;