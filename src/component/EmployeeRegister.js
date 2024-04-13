import React from 'react';
import EmployeeRegisterPage from './EmployeeRegisterPage/EmployeeRegisterPage'
import FormPageLayout from './EmployeeRegisterPage/FormLayout/FormLayout';
import EmployeeUpdatePage from './EmployeeRegisterPage/EmployeeUpdatePage';

const EmployeeRegister = () => {
  return (
    <>
    <FormPageLayout>
      <EmployeeRegisterPage />
      {/* <EmployeeUpdatePage /> */}
    </FormPageLayout>
    </>
  )
}

export default EmployeeRegister