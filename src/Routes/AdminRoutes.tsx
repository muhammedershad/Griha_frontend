import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Pages/adminPages/AdminLogin";
import AdminPrivateRoutes, { AdminLoggedInRoutes } from "./AdminPrivateRoutes";
import AdminDash from "../Pages/adminPages/AdminDash";
import AdminUserManagement from "../Pages/adminPages/AdminUserManagement";
import AdminEmployeeManagement from "../Pages/adminPages/AdminEmployeeManagement";
import InteractiveModalExample from "../components/common/Modal";
import AddProjects from "../Pages/adminPages/AddProjects";



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
                    <Route path="/add-project" element={<AddProjects />} />
                </Route>
            </Routes>
        </>
    );
};

export default AdminRoutes;
