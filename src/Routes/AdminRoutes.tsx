import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Pages/adminPages/AdminLogin";
import AdminPrivateRoutes, { AdminLoggedInRoutes } from "./AdminPrivateRoutes";
import AdminDash from "../Pages/adminPages/AdminDash";
import AdminUserManagement from "../Pages/adminPages/AdminUserManagement";
import AdminEmployeeManagement from "../Pages/adminPages/AdminEmployeeManagement";
import InteractiveModalExample from "../components/common/Modal";
import AddProjects from "../Pages/adminPages/AddProjects";
import FeaturedProjects from "../Pages/adminPages/FeaturedProjects";
import EditFeaturedProject from "../Pages/adminPages/EditFeaturedProject";
import NotFound from "../components/common/404";
import ManagePorject from "../Pages/adminPages/ManageProject";



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
                    <Route path="/projects" element={<ManagePorject />} />
                    <Route path="/add-project" element={<AddProjects />} />
                    <Route path="/featured-projects" element={<FeaturedProjects />} />
                    <Route path="/edit-featured-project/:projectId" element={<EditFeaturedProject />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AdminRoutes;
