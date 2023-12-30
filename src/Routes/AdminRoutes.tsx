import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserManagement from '../Pages/adminPages/UserManagement'
import AdminLogin from '../Pages/adminPages/AdminLogin'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/users' element={<UserManagement />} />
        <Route path='/login' element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default AdminRoutes