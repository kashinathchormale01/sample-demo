import React, { useEffect, useState } from 'react'
import jsPDF from "jspdf";
import pdf from './BankApplication.pdf';
import headimg from './header.png';
import * as yup from "yup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField,Box,Button } from '@mui/material'
import { Formik, Form, } from 'formik';
import BankApp from './BankApp';

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

let doc = new jsPDF("p", "pt", "a4");
 const source = document.getElementById("converts");
//  const newSource = doc.splitTextToSize(source, 850);
// const button = document.getElementsByTagName("button")[0];


const clickhandle = () => {
    //alert('Clicked')
    doc.addImage(headimg, 'png', 10, 10, 575, 100);
    doc.html(source, { margin:[100, 10, 10, 10],autoPaging:'text',callback: (doc) => doc.save("BankApplication.pdf") });
   
}
 
const BankApplication = () => {
//     doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");

const [applicationData, setApplicationData] = useState([{
    applicationDate: new Date(),
    bnkNameApp: "State Bank Of India",
    bnkBranchApp: "Navi Peth",
    bankAdress: "Solapur",
    chequenumApp: "555665",   
    chequeDateApp: new Date(),
    AmountbnkApp: "500056",
    chequeBy: "N.K.Sharma"
}])



// const docdate = '01/01/2010';
// const bankname = 'Bank Of Maharashtra';
// const bankAdress = 'Navi peth Solapur';
// const ChequeNo = 'ds0212125';
// const yourName = 'N.K.Sharma';
// const amount = '204010';

const generatePDF = () => {    
    let doc = new jsPDF("p", "pt");
   doc.addImage(headimg, 'png', 20, 10, 550, 84);
    doc.text(20, 20, "This is the first title.");
    doc.addFont("helvetica", "normal");
    doc.text(20, 60, "This is the second title.");
    doc.text(20, 100, "This is the thrid title.");  
    doc.html(source, { margin:[100, 10, 10, 10],autoPaging:'text',callback: (doc) => doc.save("BankApplication.pdf") });
    doc.save("demo.pdf");
  };

  function handleFormSubmit (values){
   
    const makePayload = [values];
    console.log(makePayload);
    setApplicationData(makePayload)
  }

  useEffect(()=>{
    handleFormSubmit();
  },[])

  return (
    <>
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
                  value={values.applicationDate}
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
                  value={values.chequeDateApp}
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
    <a href = {pdf} target = "_blank">Bank Application</a><br/>

    <BankApp data={applicationData} />

    </>    
  )
}

export default BankApplication