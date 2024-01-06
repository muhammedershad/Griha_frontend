import { Routes, Route } from "react-router-dom";
import EmployeePrivateRoutes, { EmployeeLoggedInRoutes } from "./EmployeePrivateRoutes";
import EmployeeLogin from "../Pages/employeePages/EmployeeLogin";
import EmployeeDash from "../Pages/employeePages/EmployeeDash";
import EmployeeProfile from "../Pages/employeePages/EmployeeProfile";
import EmployeeAvilableSlots from '../Pages/employeePages/EmployeeAvilableSlots'
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
            </Route>
        </Routes>
    </>
);
}

export default EmployeeRoutes