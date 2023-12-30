import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoutes() {
    const auth = { token: true };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminPrivateRoutes;
