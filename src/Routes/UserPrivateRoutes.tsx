import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoutes = () => {
    // const token = useSelector((state: UserSlice) => state.token)
    const token = localStorage.getItem('User_token')
    const auth = token ? true : false;
    
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export const UserLoggedInRoutes = () => {
    const token = localStorage.getItem('User_token')
    const auth = token ? true : false;
    
    return auth ? <Navigate to="/dash" /> : <Outlet />;
}

export default UserPrivateRoutes