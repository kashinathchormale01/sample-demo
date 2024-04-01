import React from 'react';
import EmployeeRegisterPage from './EmployeeRegisterPage/EmployeeRegisterPage'
import FormPageLayout from './EmployeeRegisterPage/FormLayout/FormLayout';

const EmployeeRegister = () => {
  return (
    <>
    <FormPageLayout>
      <EmployeeRegisterPage />
    </FormPageLayout>
    </>
  )
}

export default EmployeeRegister