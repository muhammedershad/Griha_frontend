import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import EmployeeRoutes from "./Routes/EmployeeRoutes";
import NotFound from "./components/common/404";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    {/* Specific routes for Admin and Employee */}
                    <Route path="/admin/*" element={<AdminRoutes />} />
                    <Route path="/employee/*" element={<EmployeeRoutes />} />

                    {/* Default route for User - Remove the wildcard */}
                    <Route path="/*" element={<UserRoutes />} />

                    {/* Fallback route for 404 - Place it at the end */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
