import { Navigate, Outlet } from "react-router-dom";

const EmployeePrivateRoutes = () => {
    const token = localStorage.getItem("Employee_token");
    const auth = token ? true : false;

    return auth ? <Outlet /> : <Navigate to="/employee/login" />;
};

export const EmployeeLoggedInRoutes = () => {
    const token = localStorage.getItem("Employee_token");
    const auth = token ? true : false;

    return auth ? <Navigate to="/employee/dash" /> : <Outlet />;
};

export default EmployeePrivateRoutes;
