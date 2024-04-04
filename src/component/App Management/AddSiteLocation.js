import React from 'react'
import { InputField } from '../../global/FormFields'
import formInitialValues from '../../global/common/FormModel/formInitialValues'
import validationSchema from '../../global/common/FormModel/validationSchema'
import { Grid, Typography } from '@mui/material'
import { Formik, Form, } from 'formik'

const AddSiteLocation = () => {
    
   
    function _handleSubmit() {
        alert('Hi')
    }
  return (
    <>
     <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}          
            onSubmit={_handleSubmit}
          >
            <Form onSubmit={_handleSubmit}>
                  <Typography variant="h6" gutterBottom>Bank Form</Typography>
                  <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                          <InputField name={siteLocName.name} label={siteLocName.label} fullWidth />
                      </Grid>
                  </Grid>
                  <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
          </Formik>
    </>
  )
}

export default AddSiteLocation