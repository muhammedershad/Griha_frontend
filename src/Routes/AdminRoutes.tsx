import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Pages/adminPages/AdminLogin";
import AdminPrivateRoutes, { AdminLoggedInRoutes } from "./AdminPrivateRoutes";
import AdminDash from "../Pages/adminPages/AdminDash";
import AdminUserManagement from "../Pages/adminPages/AdminUserManagement";
import AdminEmployeeManagement from "../Pages/adminPages/AdminEmployeeManagement";
import InteractiveModalExample from "../components/common/Modal";



const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<AdminLoggedInRoutes />}>
                    <Route path="/login" element={<AdminLogin />} />
                </Route>
                <Route element={<AdminPrivateRoutes />}>
                    <Route path="/dash" element={<AdminDash />} />
                    <Route path="/users" element={<AdminUserManagement />} />
                    <Route path="/employee" element={<AdminEmployeeManagement />} />
                    <Route path="/test" element={<InteractiveModalExample />} />
                    {/* <Route path="/projects" element={<ManagePorject />} /> */}
                </Route>
            </Routes>
        </>
    );
};

export default AdminRoutes;
