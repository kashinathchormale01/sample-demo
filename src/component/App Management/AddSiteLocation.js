import React from 'react'
import axios from "axios"; 
import * as yup from "yup";
import { InputField } from '../../global/FormFields'
// import formInitialValues from '../../global/common/FormModel/formInitialValues'
// import validationSchema from '../../global/common/FormModel/validationSchema'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Grid, Typography,TextField,Box,Button } from '@mui/material'
import { Formik, Form, } from 'formik';
import moment from 'moment';



const SiteRegisterSchema = yup.object().shape({
  siteName: yup.string().required("required"),
  siteArea: yup.string().required("required"),
  creationDate: yup.date().nullable()
});

const initialValues = {
  siteName: "",
  siteArea: "",
  creationDate: ""
};

const AddSiteLocation = () => {   
  

  function handleFormSubmit (values){
    console.log(values);
    // fetch("http://192.168.1.121:8089/api/SaveProj_Site", {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(values),
    //     });   

    axios.post('http://192.168.1.121:8089/api/SaveProj_Site', values)
      .then(res=>{
        console.log(res);
        console.log(res.data);
      })  
  };
    
   
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values);
          resetForm();
        }}
        validationSchema={SiteRegisterSchema}
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
              <TextField
                label="Site Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.siteName}
                name="siteName"
                error={Boolean(touched.siteName) && Boolean(errors.siteName)}
                helperText={touched.siteName && errors.siteName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Site Area"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.siteArea}
                name="siteArea"
                error={Boolean(touched.siteArea) && Boolean(errors.siteArea)}
                helperText={touched.siteArea && errors.siteArea}
                sx={{ gridColumn: "span 2" }}
              />

              {/* <TextField
                label="Creation Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.creationDate}
                name="creationDate"
                error={
                  Boolean(touched.creationDate) && Boolean(errors.creationDate)
                }
                helperText={touched.creationDate && errors.creationDate}
                sx={{ gridColumn: "span 4" }}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Creation Date"
                  disableFuture
                  value={values.creationDate}
                  slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                  error={Boolean(touched.creationDate) && Boolean(errors.creationDate)}
                  helperText={touched.creationDate && errors.creationDate}
                  sx={{ gridColumn: "span 4" }}
                />
              </LocalizationProvider>

              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid }
              }) => (
                <DatePicker
                  label="Date of birth"
                  disableFuture
                  value={value}
                  onChange={(value) =>
                    onChange(moment(value).format("YYYY-MM-DD"))
                  }
                  renderInput={(params) => (
                    console.log(invalid),
                    (
                      <TextField
                        error={invalid}
                        helperText={invalid ? error.message : null}
                        id="dateOfBirth"
                        variant="standard"
                        margin="dense"
                        fullWidth
                        color="primary"
                        autoComplete="bday"
                        {...params}
                      />
                    )
                  )}
                />
              )}
            />
          </LocalizationProvider> */}
            </Box>
            {/* BUTTONS */}
            <Box sx={{ marginTop: "20px" }}>
              <Button type="submit" variant="contained" color="primary">
                Add Site Location
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddSiteLocation