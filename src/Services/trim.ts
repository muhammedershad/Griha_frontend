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

export default trimVariables