import Projects from '../Pages/HomePages/Projects'
import Home from '../Pages/HomePages/Home'
import {Routes, Route} from 'react-router-dom'
import UserLogin from '../Pages/HomePages/UserLogin'
import UserSignup from '../Pages/HomePages/UserSignup'
import Desktop1 from '../components/common/test'

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/signup' element={ <UserSignup />} />
        <Route path='/test' element={<Desktop1 /> } />
      </Routes>
    </>
  )
}

export default UserRoutes
