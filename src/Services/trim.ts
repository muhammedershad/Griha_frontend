import { BankDetailsInterface } from "../interfaces/bankDetails"
import { ChangePasswordInterface } from "../interfaces/changePassword"
import { Employees } from "../interfaces/employee"

const trimVariables = ( data: Employees ) => {
    if ( data.email ) data.email = data.email.trim()
    if ( data.username ) data.username = data.username.trim()
    if ( data.firstName ) data.firstName = data.firstName.trim()
    if ( data.lastName ) data.lastName = data.lastName.trim()
    if ( data.phone ) data.phone = data.phone.trim()
    if ( data.password ) data.password = data.password.trim()
    return data
}

export const trimPasswords = ( data: ChangePasswordInterface ) => {
    if ( data.confirmPassword ) data.confirmPassword = data.confirmPassword.trim()
    if ( data.currentPassword ) data.currentPassword = data.currentPassword.trim()
    if (data.newPassword ) data.newPassword = data.newPassword.trim()
    return data
}

export const trimBankDetails = ( data: BankDetailsInterface ) => {
    if (data.bankName ) data.bankName = data.bankName.trim()
    if (data.IFSCCode ) data.IFSCCode = data.IFSCCode.trim()
    if (data.PANNumber ) data.PANNumber = data.PANNumber.trim()
    if (data.UPIId) data.UPIId = data.UPIId.trim()
    return data
}

export default trimVariables