import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import UserRoutes from "./Routes/UserRoutes"
import AdminRoutes from "./Routes/AdminRoutes"
import EmployeeRoutes from "./Routes/EmployeeRoutes"

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/employee/*' element={<EmployeeRoutes />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
