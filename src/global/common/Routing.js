import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import EmployeeRegister from '../../component/EmployeeRegister';
import LoginPage from '../../component/Login';
import Dashboard from '../../component/Dashboard';
import EmpExitForm from '../../component/EmployeeExitPage/EmployeeExitPage';


const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/employee-register" exact element={<EmployeeRegister />} />
        <Route path="/employee-exit" exact element={<EmpExitForm />} />
        {/* Redirect for login page */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default Routing