import React, { useState } from 'react';
import * as yup from "yup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField,Box,Button } from '@mui/material'
import { Formik, Form, } from 'formik';
import BankApp from './BankApp';
 
const BankApplication = () => {

const bankApplicationSchema = yup.object().shape({
  applicationDate: yup.date().nullable(),
  bnkNameApp: yup.string().required("required"),
  bnkBranchApp: yup.string().required("required"),
  bankAdress: yup.string().required("required"),
  chequenumApp: yup.string().required("required"),    
  chequeDateApp: yup.date().nullable(),
  AmountbnkApp: yup.string().required("required"),
  chequeBy: yup.string().required("required"),
});

const initialValues = {
  applicationDate: new Date(),
  bnkNameApp: "State Bank Of India",
  bnkBranchApp: "Navi Peth",
  bankAdress: "Solapur",
  chequenumApp: "",   
  chequeDateApp: new Date(),
  AmountbnkApp: "",
  chequeBy: "N.K.Sharma"
};

const [applicationData, setApplicationData] = useState(null);

let updateapplicationDate = new Date();
let updatechequeDate = new Date();

  const handleDateChange = (date)=>{
    updatechequeDate = date;
    console.log("changed date",date, "updated date",updatechequeDate)
  }

  const datehandleChange = (date)=>{
    updateapplicationDate = date;
    console.log("changed date",date, "updated date",updateapplicationDate)
  }
  
  function handleFormSubmit (values){
   
  values.applicationDate = updateapplicationDate;
   values.chequeDateApp = updatechequeDate;
   console.log("handle submit",values, "handle submit onchange",updatechequeDate)
    setApplicationData([values])
  }


  return (
    <>
   <marquee style={{ color: 'red', fontSize: '12pt' }}>If you have generated the bank application by filling a valid form then you will have to save it or print.</marquee>
    <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values);
          resetForm();
        }}
        validationSchema={bankApplicationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Application"
                  disableFuture
                  value={updateapplicationDate}
                  onChange={datehandleChange}
                  slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                  error={Boolean(touched.applicationDate) && Boolean(errors.applicationDate)}
                  helperText={touched.applicationDate && errors.applicationDate}
                  sx={{ gridColumn: "span 2" }}
                />
              </LocalizationProvider>

              <TextField
                label="Bank Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bnkNameApp}
                name="bnkNameApp"
                error={Boolean(touched.bnkNameApp) && Boolean(errors.bnkNameApp)}
                helperText={touched.bnkNameApp && errors.bnkNameApp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Branch Branch"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bnkBranchApp}
                name="bnkBranchApp"
                error={Boolean(touched.bnkBranchApp) && Boolean(errors.bnkBranchApp)}
                helperText={touched.bnkBranchApp && errors.bnkBranchApp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Bank Adress"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bankAdress}
                name="bankAdress"
                error={Boolean(touched.bankAdress) && Boolean(errors.bankAdress)}
                helperText={touched.bankAdress && errors.bankAdress}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
               type='number'
                label="Cheque Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.chequenumApp}
                name="chequenumApp"
                error={Boolean(touched.chequenumApp) && Boolean(errors.chequenumApp)}
                helperText={touched.chequenumApp && errors.chequenumApp}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                label="Cheque By"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.chequeBy}
                name="chequeBy"
                error={Boolean(touched.chequeBy) && Boolean(errors.chequeBy)}
                helperText={touched.chequeBy && errors.chequeBy}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
               type='number'
                label="Amount to Pay"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.AmountbnkApp}
                name="AmountbnkApp"
                error={Boolean(touched.AmountbnkApp) && Boolean(errors.AmountbnkApp)}
                helperText={touched.AmountbnkApp && errors.AmountbnkApp}
                sx={{ gridColumn: "span 2" }}
              />
            
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Cheque Date"
                  name='chequeDateApp'
                  value={updatechequeDate}
                  onChange={handleDateChange}
                  slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                  error={Boolean(touched.chequeDateApp) && Boolean(errors.creationDate)}
                  helperText={touched.chequeDateApp && errors.chequeDateApp}
                  sx={{ gridColumn: "span 2" }}
                />
              </LocalizationProvider>

             
            </Box>
            {/* BUTTONS */}
            <Box sx={{ marginTop: "20px" }}>
              <Button type="submit" variant="contained" color="primary">
                Generate Bank Application
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      
    <BankApp data={applicationData} />

    </>    
  )
}

export default BankApplication