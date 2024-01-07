export interface Employees extends Document {
    jobRole: string;
    joinedDate: Date;
    lastName: string;
    firstName: string;
    _id: string;
    name: string;
    password: string;
    phone: number;
    department: string;
    experience: number;
    // bankDetails: {
    //    accountNumber: number;
    //    BankName: string;
    //    IFSCcode: string;
    //    PanNumber: string;
    //    UpiId: string;
    // };
    username: string;
    email: string;
    teamLead: boolean;
    isBlocked: boolean;
    isSenior: boolean;
    image: string
}

export interface EmployeesForm {
    firstName: string;
    email: string;
    password: string;
    department: string;
    jobRole: string;
}
