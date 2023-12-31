export interface Employees extends Document {
    _id: string;
    name: string;
    password: string;
    phone: number;
    job: {
       department: string;
       experience: number;
       jobRole: string;
       joinDate: Date;
    };
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
  }

  export interface EmployeesForm {
    name: string;
    email: string;
    password: string;
    department: string;
    jobRole: string;
  }