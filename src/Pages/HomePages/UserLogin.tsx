import Login from '../../components/common/Login'
import Navbar from '../../components/Home/Navbar'
import Body from '../../components/common/Body'
import api from '../../Services/api';
const login = api.login

const UserLogin = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Body />
      <div className="absolute inset-0 items-center justify-center">
        <Login title='User' loginFn={login} navigateTo='/dash' />
      </div>
      <Navbar />
    </div>
  );
};

export default UserLogin;
