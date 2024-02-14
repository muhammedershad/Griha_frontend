import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoutes() {
    const token = localStorage.getItem("Admin_token");
    const auth = token ? true : false;

    return auth ? <Outlet /> : <Navigate to="/admin/login" />;
}

export const AdminLoggedInRoutes = () => {
    const token = localStorage.getItem("Admin_token");
    const auth = token ? true : false;

    return auth ? <Navigate to="/admin/dash" /> : <Outlet />;
};

export default AdminPrivateRoutes;
