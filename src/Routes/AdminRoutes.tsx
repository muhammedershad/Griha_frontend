import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserManagement from '../Pages/adminPages/UserManagement'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/users' element={<UserManagement />} />
      </Routes>
    </>
  )
}

export default AdminRoutes