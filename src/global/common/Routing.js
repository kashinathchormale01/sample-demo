import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import EmployeeRegister from '../../component/EmployeeRegister';
import LoginPage from '../../component/Login';
import Dashboard from '../../component/Dashboard';
import EmpExitForm from '../../component/EmployeeExitPage/EmployeeExitPage';
import EmployeeList from '../../component/EmployeeList/EmployeeList';
import AddSiteLocation from '../../component/App Management/SiteLocationManagement/AddSiteLocation';
import SiteLocationManagement from '../../component/App Management/SiteLocationManagement/SiteLocationManagement';
import AddUser from '../../component/UserManagement/AddUser';
import UserManagement from '../../component/UserManagement/UserManagement';
import EditSiteLocation from '../../component/App Management/SiteLocationManagement/EditSiteLocation';
import BankApplication from '../../component/FinanceManagement/BankApplication';
import EmployeeUpdatePage from '../../component/EmployeeRegisterPage/EmployeeUpdatePage';
import MyProfile from '../../component/MyDetails/MyProfile';
import Example from '../../component/EmployeeWageRegister/EmployeeWageRegister';
import UserPromote from '../../component/App Management/UserPromote/UserPromote';




const Routing = () => {
  return (
    <>
      <Routes>

       {/* Employee Managament Routes */}
        <Route path='/employee-list' exact element={<EmployeeList /> } /> 
        <Route path="/employee-register" exact element={<EmployeeRegister />} />
        <Route path="/employee-update" exact element={<EmployeeUpdatePage />} />
        <Route path="/employee-exit" exact element={<EmpExitForm />} />

        {/* Employee Wage Register */}
        <Route path="/employee-wage-register" exact element={<Example />} />
                
        {/* User Managament Routes */}
        <Route path='/add-user' exact element={<AddUser />} />
        <Route path='/user-management' exact element={<UserManagement />} />
        <Route path='/my-profile' exact element={<MyProfile />} />
        <Route path='/user-promote' exact element={<UserPromote />} />

         {/* Site Location Managament Routes */}
        <Route path='/work-location-management' exact element={<SiteLocationManagement />} />
        <Route path='/add-site-location' exact element={<AddSiteLocation /> } />
        <Route path='/edit-site-location/:id' exact element={<EditSiteLocation />} />
        
         {/* Finance Managament Routes */}
        <Route path='/bank-application' exact element={<BankApplication />} />

        {/* Redirect for login page */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default Routing