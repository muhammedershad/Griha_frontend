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
import NotFound from "../components/common/404";
import TaskManagement from "../Pages/employeePages/TaskManagement";
import CreateTask from "../Pages/employeePages/CreateTask";
import CreateProject from "../components/employee/CreateProject";
import TaskDetails from "../Pages/employeePages/TaskDetails";
import Meeting from "../Pages/employeePages/Meeting";
import Room from "../components/common/videoCall/Room";
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
                <Route path="/project/:projectId/:progressId" element={<EmployeeProjectProgress />} />
                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/create-task/:projectId" element={<CreateTask />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/task/:taskId" element={<TaskDetails />} />
                <Route path="/meetings" element={<Meeting />} />
                <Route path='/room/:id' element={<Room />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </>
);
}

export default EmployeeRoutes