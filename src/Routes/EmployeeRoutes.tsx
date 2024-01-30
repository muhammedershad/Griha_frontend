import { Routes, Route } from "react-router-dom";
import EmployeePrivateRoutes, { EmployeeLoggedInRoutes } from "./EmployeePrivateRoutes";
import EmployeeLogin from "../Pages/employeePages/EmployeeLogin";
import EmployeeDash from "../Pages/employeePages/EmployeeDash";
import EmployeeProfile from "../Pages/employeePages/EmployeeProfile";
import EmployeeAvilableSlots from '../Pages/employeePages/EmployeeAvilableSlots'
import EmployeeProjects from "../Pages/employeePages/EmployeeProjects";
import ProjectDetails from "../Pages/employeePages/ProjectDetails";
import ProjectProgress from "../components/employee/ProjectProgress";
import EmployeeProjectProgress from "../Pages/employeePages/EmployeeProjectProgress";
const EmployeeRoutes = () => {
  return (
    <>
        <Routes>
            <Route element={<EmployeeLoggedInRoutes />}>
                <Route path="/login" element={<EmployeeLogin />} />
            </Route>
            <Route element={<EmployeePrivateRoutes />}>
                <Route path="/dash" element={<EmployeeDash />} />
                <Route path="/profile" element={<EmployeeProfile />} />
                <Route path="/time-slots" element={<EmployeeAvilableSlots />} />
                <Route path="/projects" element={<EmployeeProjects />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                {/* <Route path="/project/progress/:id" element={<EmployeeProjectProgress />} /> */}
            </Route>
        </Routes>
    </>
);
}

export default EmployeeRoutes