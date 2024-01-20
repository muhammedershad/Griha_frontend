import Home from "../Pages/HomePages/Home";
import { Routes, Route } from "react-router-dom";
import UserLogin from "../Pages/HomePages/UserLogin";
import UserSignup from "../Pages/HomePages/UserSignup";
import UserDash from "../Pages/userPages/UserDash";
import UserPrivateRoutes, { UserLoggedInRoutes } from "./UserPrivateRoutes";
import Profile from "../Pages/userPages/Profile";
import UserProjects from "../Pages/userPages/UserProjects";
import ProjectDetails from "../Pages/userPages/ProjectDetails";
import Projects from "../Pages/HomePages/Projects";
import UserProjectDetails from "../Pages/HomePages/ProjectDetails";

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<UserLoggedInRoutes />}>
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/signup" element={<UserSignup />} />
                    <Route path="/project" element={<Projects />} />
                    <Route path="/project/:id" element={<UserProjectDetails />} />
                </Route>
                <Route element={<UserPrivateRoutes />}>
                    <Route path="/client-project/:id" element={<ProjectDetails />} />
                    <Route path="/projects" element={<UserProjects />} />
                    <Route path="/dash" element={<UserDash />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </>
    );
};

export default UserRoutes;
