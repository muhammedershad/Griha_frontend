import { Navigate, Outlet } from "react-router-dom";
import { employeeApi } from "../Services/employeeApi";

const EmployeePrivateRoutes = () => {
    const token = localStorage.getItem('Employee_token')
    const auth = token ? true : false;
    
    console.log('calling private routes');
    
    if ( token ) {
        console.log('here');
        
        const employee = employeeApi.employeeDetails()
        console.log('there')
        console.log(employee,'employee');  
    }
    return auth ? <Outlet /> : <Navigate to="/employee/login" />;
}

export const EmployeeLoggedInRoutes = () => {
    const token = localStorage.getItem('Employee_token')
    const auth = token ? true : false;
    
    return auth ? <Navigate to="/employee/dash" /> : <Outlet />;
}

export default EmployeePrivateRoutes;