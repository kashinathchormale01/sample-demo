import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import EmployeeRegister from '../../component/EmployeeRegister';
import LoginPage from '../../component/Login';
import Dashboard from '../../component/Dashboard';
import EmpExitForm from '../../component/EmployeeExitPage/EmployeeExitPage';
import EmployeeList from '../../component/EmployeeList/EmployeeList';
import AddSiteLocation from '../../component/App Management/AddSiteLocation';
import SiteLocationManagement from '../../component/App Management/SiteLocationManagement';


const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/employee-register" exact element={<EmployeeRegister />} />
        <Route path="/employee-exit" exact element={<EmpExitForm />} />
        <Route path='/employee-list' exact element={<EmployeeList /> } />
        <Route path='/add-site-location' exact element={<AddSiteLocation /> } />
        <Route path='/work-location-management' exact element={<SiteLocationManagement />} />

        {/* Redirect for login page */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default Routing