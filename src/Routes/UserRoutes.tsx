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
import UserMessenger from "../Pages/userPages/UserMessenger";
import VideoCall from "../Pages/userPages/VideoCall";
import Room from "../components/common/videoCall/Room";
import NotFound from "../components/common/404";
import Meeting from "../Pages/userPages/Meeting";
import Payment from "../components/common/payment";
import PaymentSuccessPage from "../components/common/PaymentSuccessPage";
import Paymets from "../Pages/userPages/Paymets";
import UserProjectProgress from "../Pages/userPages/UserProjectProgress";
import Learning from "../Pages/HomePages/Learning";

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<UserLoggedInRoutes />}>
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/signup" element={<UserSignup />} />
                    <Route path="/project" element={<Projects />} />
                    <Route
                        path="/project/:projectId"
                        element={<UserProjectDetails />}
                    />
                    <Route path="/videoCall" element={<VideoCall />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/learn" element={<Learning />} />
                    <Route
                        path="/checkout-success"
                        element={<PaymentSuccessPage />}
                    />
                </Route>
                <Route element={<UserPrivateRoutes />}>
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/projects" element={<UserProjects />} />
                    <Route path="/dash" element={<UserDash />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/messages" element={<UserMessenger />} />
                    <Route path="/meeting" element={<Meeting />} />
                    <Route path="/room/:id" element={<Room />} />
                    <Route path="/payments" element={<Paymets />} />
                    <Route path="/projects/:projectId/:progressId" element={<UserProjectProgress />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default UserRoutes;
