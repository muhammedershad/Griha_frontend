import Projects from "../Pages/HomePages/Projects";
import Home from "../Pages/HomePages/Home";
import { Routes, Route } from "react-router-dom";
import UserLogin from "../Pages/HomePages/UserLogin";
import UserSignup from "../Pages/HomePages/UserSignup";
import UserDash from "../Pages/userPages/UserDash";
import UserPrivateRoutes, { UserLoggedInRoutes } from "./UserPrivateRoutes";

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<UserLoggedInRoutes />}>
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/signup" element={<UserSignup />} />
                </Route>
                <Route element={<UserPrivateRoutes />}>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/dash" element={<UserDash />} />
                </Route>
            </Routes>
        </>
    );
};

export default UserRoutes;
