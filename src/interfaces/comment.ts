import { Employees } from "./employee";

export interface comment {
    comment: string;
    user: Employees;
    time: Date;
    id?: string;
}
