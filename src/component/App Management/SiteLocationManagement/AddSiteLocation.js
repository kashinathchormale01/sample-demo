import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField,Box,Button } from '@mui/material'
import { Formik, Form, } from 'formik';
import { useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import axiosHttp from '../../../AxiosInstance';

const SiteRegisterSchema = yup.object().shape({
  siteName: yup.string().required("required"),
  siteArea: yup.string().required("required"),
  creationDate: yup.date().nullable()
});

const initialValues = {
  siteName: "",
  siteArea: "",
  creationDate: new Date()
};

const AddSiteLocation = () => {   
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  function handleFormSubmit (values){
    console.log(values);
    axiosHttp.post('/SaveProj_Site', values)
      .then(res=>{
        console.log(res);
        console.log(res.data);
        toast.success(res.data.msg);  
        setIsDirty(false);
        navigate('/work-location-management');
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Failed to submit form. Please try again.');
      });
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
          dirty, 
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
                onChange={(e) => {
                  handleChange(e);
                  setIsDirty(true); 
                }}
                value={values.siteName}
                name="siteName"
                error={Boolean(touched.siteName) && Boolean(errors.siteName)}
                helperText={touched.siteName && errors.siteName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Site Area"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setIsDirty(true); 
                }}
                value={values.siteArea}
                name="siteArea"
                error={Boolean(touched.siteArea) && Boolean(errors.siteArea)}
                helperText={touched.siteArea && errors.siteArea}
                sx={{ gridColumn: "span 2" }}
              />
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Creation Date"
                  disableFuture
                  onBlur={handleBlur}
                  onChange={(date) => {
                    handleChange(date);
                    setIsDirty(true); // Set dirty state when form values change
                  }}
                  value={values.creationDate}
                  slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                  error={Boolean(touched.creationDate) && Boolean(errors.creationDate)}
                  helperText={touched.creationDate && errors.creationDate}
                  sx={{ gridColumn: "span 4" }}
                />
              </LocalizationProvider>
             
            </Box>
            {/* BUTTONS */}
            <Box sx={{ marginTop: "20px" }}>
              <Button type="submit" variant="contained" color="primary" disabled={!dirty}>
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
