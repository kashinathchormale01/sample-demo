import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import Dashboard from '../../component/Dashboard';
import EmpExitForm from '../../component/EmployeeManagement/EmployeeExitPage/EmployeeExitPage';
import EmployeeList from '../../component/EmployeeManagement/EmployeeList/EmployeeList';
import AddSiteLocation from '../../component/App Management/SiteLocationManagement/AddSiteLocation';
import SiteLocationManagement from '../../component/App Management/SiteLocationManagement/SiteLocationManagement';
import EditSiteLocation from '../../component/App Management/SiteLocationManagement/EditSiteLocation';
import BankApplication from '../../component/FinanceManagement/BankApplication';
import MyProfile from '../../component/MyDetails/MyProfile';
import BasicTable from '../../component/EmployeeWageRegister/EmployeeWageRegister';
import UserPromote from '../../component/App Management/UserPromote/UserPromote';
import { EmployeeTimeSheet } from '../../component/EmployeeManagement/EmployeeAttendance/EmployeeAttendance';
import AddDesignation from '../../component/App Management/DesignationManagement/AddDesignation';
import DesignationManagement from '../../component/App Management/DesignationManagement/DesignationManagement';
import EditDesignation from '../../component/App Management/DesignationManagement/EditDesignation';
import WageSlip from '../../component/FinanceManagement/Wageslip';
import EmployeeDetails from '../../component/EmployeeManagement/EmployeeDetails/EmployeeDetails';
import UserPromotedList from '../../component/App Management/UserPromote/UserPromotedList';
import UserPasswordReset from '../../component/App Management/UserPromote/UserPasswordReset';
import MyAttendance from '../../component/MyDetails/MyAttendance';
import MyPayslip from '../../component/MyDetails/MyPayslip';
import AccessManagement from '../../component/App Management/AccessManagement/AccessManagement';
import LoginForm from '../../component/LoginManagement/LoginForm';
import EmployeeEnrollMain from '../../component/EmployeeManagement/EmployeeEnrollment/EmployeeEnrollMain';
import VarRateChart from '../../component/FinanceManagement/VarRateChart';
import PasswordChange from '../../component/LoginManagement/ChangePassword/PasswordChange';
import Contactlist from '../../component/MyDetails/Contactlist';
import GenerateBill from '../../component/ReportManagement/GenerateBill/GenerateBill';
import Viewbill from '../../component/ReportManagement/Viewbill/Viewbill';
import PFValidationReport from '../../component/FinanceManagement/PFValidationReport/PFValidationReport';
// import EmployeeInActiveList1 from '../../component/EmployeeManagement/EmployeeList/EmployeeInActiveList';
import EmployeeInActiveList from '../../component/EmployeeManagement/EmployeeList/EmployeeInactiveList';

const Routing = () => {
  return (
    <>
      <Routes>

       {/* Employee Managament Routes */}
        <Route path='/employee-list' exact element={<EmployeeList /> } />
        <Route path='/employee-inactive-list' exact element={<EmployeeInActiveList /> } /> 
        <Route path='/employee-register' exact element={<EmployeeEnrollMain />} />
        <Route path="/employee-exit" exact element={<EmpExitForm />} />
        <Route path="/employee-details" exact element={<EmployeeDetails />} />

        {/* Employee Wage Register */}
        <Route path="/generate-wage-reports" exact element={<BasicTable />} />
        <Route path="/generate-wage-slip" exact element={<WageSlip />} />
        <Route path='/rate-chart' exact element={<VarRateChart />} />
        <Route path='/generate-bill' exact element={<GenerateBill />} />
        <Route path='/view-bill' exact element={<Viewbill />} />
        <Route path='/emp-pf-validation' exact element={<PFValidationReport />} />

        {/* Employee attendance */}
        <Route path='/employee-attendance' exact element={<EmployeeTimeSheet />} />
                
        {/* User Managament Routes */}   
        <Route path='/my-profile' exact element={<MyProfile />} />
        <Route path='/my-attendance' exact element={<MyAttendance />} />
        <Route path='/my-payslip' exact element={<MyPayslip />} />        
        <Route path='/user-promote' exact element={<UserPromote />} />
        <Route path='/user-promoted-list' exact element={<UserPromotedList />} />
        <Route path='/user-password-reset' exact element={<UserPasswordReset />} />
        <Route path='/change-password' exact element={<PasswordChange />} />
        <Route path='/access-management' exact element={<AccessManagement />} />

        {/* Site Location Managament Routes */}
        <Route path='/designation-management' exact element={<DesignationManagement /> } />
        <Route path='/add-designation' exact element={<AddDesignation />} />
        <Route path='/edit-designation/:id' exact element={<EditDesignation />} />

         {/* Site Location Managament Routes */}
        <Route path='/work-location-management' exact element={<SiteLocationManagement />} />
        <Route path='/add-site-location' exact element={<AddSiteLocation /> } />
        <Route path='/edit-site-location/:id' exact element={<EditSiteLocation />} />
        
         {/* Finance Managament Routes */}
        <Route path='/bank-application' exact element={<BankApplication />} />
        <Route path='/contact-list' exact element={<Contactlist />} />


        {/* Redirect for login page */}
        <Route path='/login' exact element={<LoginForm />} />
        <Route path='/' element={<Navigate to='/my-profile' />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default Routing