import React from 'react'
import FormPageLayout from './Layout/FormLayoutWrapper'
import EmployeeRegister from '../EmployeeRegister'
import EmployeeEnroll from './EmployeeRegister'

const EmployeeEnrollMain = () => {
  return (
    <FormPageLayout>
        <EmployeeEnroll />
    </FormPageLayout>
  )
}

export default EmployeeEnrollMain