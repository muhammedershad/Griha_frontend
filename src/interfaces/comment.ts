import { Employees } from "./employee"
import User from "./user"

export interface comment {
    comment: string
    user: Employees
    time: Date
    id: string
}