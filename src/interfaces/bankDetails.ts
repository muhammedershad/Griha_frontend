export interface BankDetailsInterface extends Document {
    _id?: string;
    accountNumber: number;
    IFSCCode: string;
    bankName: string;
    PANNumber: string;
    UPIId: string;
    userId?: string;
}
