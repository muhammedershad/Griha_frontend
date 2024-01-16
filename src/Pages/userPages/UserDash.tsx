import axios from '../../Services/axios'
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import UserSideBar from '../../components/user/UserSideBar';


const UserDash = () => {
    const navigate = useNavigate()
    const testCall = async () => {
        console.log('hiii');
        
        const res = await axios.get('/user/test')
        console.log(res);
        
    }

    const logout = async () => {
        api.userLogout()
        localStorage.removeItem('User_token');
        navigate('/login')
    }
    return (
        <>
            <UserSideBar>
                <p>dash</p>
            </UserSideBar>
        </>
    );
};

export default UserDash;
