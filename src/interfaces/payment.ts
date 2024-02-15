import { Project } from "./project";
import User from "./user";

export interface IPayment extends Document {
    _id: string;
    paidBy: string | User;
    paidTo: string;
    purpose: String;
    paymentType: String;
    status: String;
    amount: number;
    bonus: number;
    project: string | Project;
    progress: string;
}

export interface PaymentPopulated extends IPayment {
    paidBy: User;
    project: Project;
}
